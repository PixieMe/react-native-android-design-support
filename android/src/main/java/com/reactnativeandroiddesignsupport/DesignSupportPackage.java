package com.reactnativeandroiddesignsupport;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * The React package.
 */
public class DesignSupportPackage implements ReactPackage {

  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();
    return modules;
  }

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Arrays.<ViewManager>asList(
      new ReactTextInputLayoutManager(),
      new ReactNestedScrollViewManager(),
      new ReactAppBarLayoutManager(),
      new ReactCoordinatorLayoutManager(),
      new ReactTabLayoutManager(),
      new ReactFloatingActionButtonManager()
    );
  }
}
