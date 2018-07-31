package com.delgate;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.github.wuxudong.rncharts.MPAndroidChartPackage;
import com.horcrux.svg.SvgPackage;
import com.imagepicker.ImagePickerPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.airbnb.android.react.maps.MapsPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.zyu.ReactNativeWheelPickerPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new MPAndroidChartPackage(),
            new SvgPackage(),
            new ImagePickerPackage(),
            new ReactVideoPackage(),
            new VectorIconsPackage(),
            new FIRMessagingPackage(),
            new LinearGradientPackage(),
            new ReactNativeWheelPickerPackage(),
            new MapsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
