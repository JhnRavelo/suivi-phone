package com.europ_alu.suivi;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.qs.helper.printer.BtService;
import com.qs.helper.printer.Device;
import com.qs.helper.printer.PrintService;
import com.qs.helper.printer.PrinterClass;

import java.util.ArrayList;
import java.util.List;

public class PrinterMainActivity extends ReactContextBaseJavaModule {

    public static final int MESSAGE_READ = 2;
    public  static PrinterClass pl = null;
    private String status;
    private final Context _context;
    private Context context;
    public static final int MESSAGE_STATE_CHANGE = 1;
    public static List<Device> deviceList = new ArrayList<>();
    private static final int REQUEST_BLUETOOTH_PERMISSIONS = 1;
    public PrinterMainActivity(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
        _context = reactContext;
        Handler mhandler = new Handler(Looper.getMainLooper(), new Handler.Callback() {
            @Override
            public boolean handleMessage(@NonNull Message msg) {
                switch (msg.what) {
                    case PrinterMainActivity.MESSAGE_READ:
                        byte[] readBuf = (byte[]) msg.obj;
                        if (readBuf[0] == 0x13) {
                            PrintService.isFUll = true;
                            status = "Printer buffer full";
                        } else if (readBuf[0] == 0x11) {
                            PrintService.isFUll = false;
                            status = "Printer buffer empty";
                        } else if (readBuf[0] == 0x08) {
                            status = "No paper";
                        } else if (readBuf[0] == 0x04) {
                            status = "High temperature";
                        } else if (readBuf[0] == 0x02) {
                            status = "Low power";
                        } else {
                            String readMessage = new String(readBuf, 0, msg.arg1);
                            if (readMessage.contains("800")) {
                                PrintService.imageWidth = 72;
                                status = "80mm paper";
                            } else if (readMessage.contains("580")) {
                                PrintService.imageWidth = 48;
                                status = "58mm paper";
                            }
                        }
                        break;
                    case PrinterMainActivity.MESSAGE_STATE_CHANGE:
                        switch (msg.arg1) {
                            case PrinterClass.STATE_CONNECTED:
                                status = "Printer connected";
                                break;
                            case PrinterClass.STATE_CONNECTING:
                                status = "Printer connecting";
                                break;
                            case PrinterClass.STATE_LISTEN:
                            case PrinterClass.STATE_NONE:
                                break;
                            case PrinterClass.SUCCESS_CONNECT:
                                pl.write(new byte[]{0x1b, 0x2b});
                                status = "Printer connection success";
                                break;
                            case PrinterClass.FAILED_CONNECT:
                                status = "Printer connection failed";
                                break;
                            case PrinterClass.LOSE_CONNECT:
                                status = "Printer connection lost";
                                break;
                        }
                        break;
                }
                return true;
            }
        });

        Handler handler = new Handler(Looper.getMainLooper(), new Handler.Callback() {
            @Override
            public boolean handleMessage(@NonNull Message msg) {
                if (msg.what == 1) {
                    Device d = (Device) msg.obj;
                    if (d != null) {
                        if (deviceList == null) {
                            deviceList = new ArrayList<>();
                        }
                        if (!checkData(deviceList, d)) {
                            deviceList.add(d);
                        }
                    }
                }
                return true;
            }
        });

        pl = new BtService(reactContext, mhandler, handler);
    }
    @NonNull
    @Override
    public String getName() {
        return "PrinterMainActivity";
    }

    @ReactMethod
    private void checkAndRequestBluetoothPermissions(Callback cb) {
        Activity activity = getCurrentActivity();
        if (activity == null) {
            cb.invoke("NO_ACTIVITY", "Current activity is null", null);
            return;
        }
        if (ContextCompat.checkSelfPermission(activity, android.Manifest.permission.BLUETOOTH_SCAN) != PackageManager.PERMISSION_GRANTED ||
                ContextCompat.checkSelfPermission(activity, android.Manifest.permission.BLUETOOTH_CONNECT) != PackageManager.PERMISSION_GRANTED ||
                ContextCompat.checkSelfPermission(activity, android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {

            ActivityCompat.requestPermissions(activity,
                    new String[]{
                            android.Manifest.permission.BLUETOOTH_SCAN,
                            android.Manifest.permission.BLUETOOTH_CONNECT,
                            Manifest.permission.ACCESS_FINE_LOCATION
                    },
                    REQUEST_BLUETOOTH_PERMISSIONS);
        }else {
            cb.invoke(null, "permissions Bluetooth already granted");
        }
    }

    private boolean hasBluetoothPermissions() {
        return ContextCompat.checkSelfPermission(context, Manifest.permission.BLUETOOTH_SCAN) == PackageManager.PERMISSION_GRANTED &&
                ContextCompat.checkSelfPermission(context, Manifest.permission.BLUETOOTH_CONNECT) == PackageManager.PERMISSION_GRANTED &&
                ContextCompat.checkSelfPermission(context, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED;
    }

    @ReactMethod
    public void startScan(Callback cb) {
        try{
            if (!hasBluetoothPermissions()) {
                cb.invoke("Bluetooth permissions not granted", null);
                return;
            }

            if (_context == null) {
                cb.invoke("Context is null", null);
                return;
            }

            if (pl == null) {
                cb.invoke("Printer instance is null", null);
                return;
            }

            if (!pl.IsOpen()) {
                pl.open(_context);
            }
            pl.scan();
            deviceList = pl.getDeviceList();
            if(deviceList == null) {
                cb.invoke("Devices is null", null); 
                return;
            }
            cb.invoke(null, deviceList);
        }catch (Exception e) {
            cb.invoke(e, null);
        }
    }

    @ReactMethod
    public void connectToDevice(String address, Callback cb) {
        // Implement the logic to connect to the device
        if (pl != null) {
            pl.connect(address);
            String msg = "Connecting to " + address;
            cb.invoke(null, msg);
        } else {
            cb.invoke("Printer instance is null", null);
        }
    }

    @ReactMethod
    public void getPrinterStatus(Callback cb) {
        try {
            if(pl!=null) {
                status = String.valueOf(pl.getState());
                cb.invoke(null, status);

            }
        }catch (Exception e) {
            cb.invoke(e, null);
        }
    }

    @ReactMethod
    public void printQRCode(String str) {

        if(str==null||str.length()<=0) return;

        sendcommand("SIZE 80 mm,40 mm\r\n");
        sendcommand("GAP 3 mm,0 mm\r\n");
        sendcommand("REFERENCE 0,0\r\n");
        sendcommand("SPEED 4.0\r\n");
        sendcommand("DENSITY 8\r\n");
        sendcommand("SET PEEL OFF\r\n");
        sendcommand("SET CUTTER OFF\r\n");
        sendcommand("SET TEAR ON\r\n");
        sendcommand("DIRECTION 0\r\n");
        sendcommand("SHIFT 0\r\n");
        sendcommand("OFFSET 0 mm\r\n");
        sendcommand("CLS\r\n");
        sendcommand("QRCODE 20,20,M,8,A,0,M2,S0,\""+str+"\"\r\n");

    }

    public void sendcommand(String message)
    {
        byte[] msgBuffer = message.getBytes();
        pl.write(msgBuffer);
    }
    private boolean checkData(List<Device> list, Device d) {
        for (Device device : list) {
            if (device.deviceAddress.equals(d.deviceAddress)) {
                return true;
            }
        }
        return false;
    }

}
