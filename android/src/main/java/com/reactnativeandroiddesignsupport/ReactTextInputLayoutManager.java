package com.reactnativeandroiddesignsupport;

import android.support.design.widget.TextInputLayout;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

import javax.annotation.Nullable;

public class ReactTextInputLayoutManager extends ViewGroupManager<TextInputLayout> {

  @Override
  public String getName() {
    return "RCTTextInputLayoutAndroid";
  }

  @Override
  public TextInputLayout createViewInstance(ThemedReactContext context) {
    TextInputLayout textInputLayout = new TextInputLayout(context);
    return textInputLayout;
  }

  @Override
  public boolean needsCustomLayoutForChildren()
  {
    return true;
  }

  @ReactProp(name = "hint")
  public void setHint(TextInputLayout view, @Nullable String hintText) {
    view.setHint(hintText);
  }

  @ReactProp(name = "hintAnimationEnabled")
  public void setHintAnimationEnabled(TextInputLayout view, boolean hintAnimationEnabled) {
    view.setHintAnimationEnabled(hintAnimationEnabled);
  }

  @ReactProp(name = "errorEnabled")
  public void setErrorEnabled(TextInputLayout view, boolean errorEnabled) {
    view.setErrorEnabled(errorEnabled);
  }

  @ReactProp(name = "error")
  public void setError(TextInputLayout view, @Nullable String errorMessage) {
    view.setError(errorMessage);
  }

  @ReactProp(name = "counterEnabled")
  public void setCounterEnabled(TextInputLayout view, boolean counterEnabled) {
    view.setCounterEnabled(counterEnabled);
  }

  @ReactProp(name = "counterMaxLength")
  public void setCounterMaxLength(TextInputLayout view, int counterMaxLength) {
    view.setCounterMaxLength(counterMaxLength);
  }

  @ReactProp(name = "passwordVisibilityToggleEnabled")
  public void setPasswordVisibilityToggleEnabled(TextInputLayout view, boolean toggleEnabled) {
    view.setPasswordVisibilityToggleEnabled(toggleEnabled);
  }

  @Override
  public void addView(final TextInputLayout parent, View child, int index)
  {
    super.addView(parent, child, index);

    // get the indicator layout
    View possibleIndicatorLayout = parent.getChildAt(1);
    if (possibleIndicatorLayout instanceof ViewGroup)
    {
      ViewGroup indicatorLayout = (ViewGroup) possibleIndicatorLayout;

      View possibleCounterText = indicatorLayout.getChildAt(indicatorLayout.getChildCount() - 1);
      if (possibleCounterText instanceof TextView)
      {
        possibleCounterText.setMinimumWidth(256);
        ((TextView) possibleCounterText).setGravity(Gravity.CENTER_VERTICAL | Gravity.RIGHT | Gravity.END);
      }
    }
  }
}
