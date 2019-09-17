package com.reactnativeandroiddesignsupport;

import android.content.res.AssetManager;
import android.content.res.ColorStateList;
import android.graphics.Typeface;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.text.ReactFontManager;
import com.google.android.material.textfield.TextInputLayout;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

import javax.annotation.Nullable;

public class ReactTextInputLayoutManager extends ViewGroupManager<TextInputLayout>
{
	@Override
	public String getName()
	{
		return "RCTTextInputLayoutAndroid";
	}

	@Override
	public TextInputLayout createViewInstance(ThemedReactContext context)
	{
		TextInputLayout textInputLayout = new TextInputLayout(context);
		return textInputLayout;
	}

	@Override
	public boolean needsCustomLayoutForChildren()
	{
		return false;
	}

	@ReactProp(name = "hint")
	public void setHint(TextInputLayout view, @Nullable String hintText)
	{
		view.setHint(hintText);
	}

	@ReactProp(name = "hintAnimationEnabled")
	public void setHintAnimationEnabled(TextInputLayout view, boolean hintAnimationEnabled)
	{
		view.setHintAnimationEnabled(hintAnimationEnabled);
	}

	@ReactProp(name = "errorEnabled")
	public void setErrorEnabled(TextInputLayout view, boolean errorEnabled)
	{
		view.setErrorEnabled(errorEnabled);
	}

	@ReactProp(name = "error")
	public void setError(TextInputLayout view, @Nullable String errorMessage)
	{
		view.setError(errorMessage);
	}

	@ReactProp(name = "counterEnabled")
	public void setCounterEnabled(TextInputLayout view, boolean counterEnabled)
	{
		view.setCounterEnabled(counterEnabled);
	}

	@ReactProp(name = "counterMaxLength")
	public void setCounterMaxLength(TextInputLayout view, int counterMaxLength)
	{
		view.setCounterMaxLength(counterMaxLength);
	}

	@ReactProp(name = "passwordVisibilityToggleEnabled")
	public void setPasswordVisibilityToggleEnabled(TextInputLayout view, boolean toggleEnabled)
	{
		view.setPasswordVisibilityToggleEnabled(toggleEnabled);
	}

	@ReactProp(name = "color",
	           customType = "Color")
	public void setColor(TextInputLayout view, int textColor)
	{
		try
		{
			Field defaultTextColorField = view.getClass().getDeclaredField("mDefaultTextColor");
			defaultTextColorField.setAccessible(true);
			defaultTextColorField.set(view, ColorStateList.valueOf(textColor));
			Method updateMethod = view.getClass().getDeclaredMethod("updateLabelState", boolean.class);
			updateMethod.setAccessible(true);
			updateMethod.invoke(view, false);
		}
		catch (Exception ex)
		{
			Log.e("3SC", "Could not change TextInputLayout default text color", ex);
		}
	}

	@ReactProp(name = "focusedTextColor",
	           customType = "Color")
	public void setFocusedColor(TextInputLayout view, int textColor)
	{
		try
		{
			Field focusedTextColorField = view.getClass().getDeclaredField("mFocusedTextColor");
			focusedTextColorField.setAccessible(true);
			focusedTextColorField.set(view, ColorStateList.valueOf(textColor));
			Method updateMethod = view.getClass().getDeclaredMethod("updateLabelState", boolean.class);
			updateMethod.setAccessible(true);
			updateMethod.invoke(view, false);
		}
		catch (Exception ex)
		{
			Log.e("3SC", "Could not change TextInputLayout focused text color", ex);
		}
	}

	@ReactProp(name = "fontFamily")
	public void setFontFamily(TextInputLayout view, String fontFamily)
	{
		AssetManager assetManager = view.getContext().getAssets();
		int style = Typeface.NORMAL;

		Typeface prevTypeface = view.getTypeface();
		if (prevTypeface != null)
		{
			style = prevTypeface.getStyle();
		}

		Typeface typeface = ReactFontManager.getInstance().getTypeface(fontFamily, style, assetManager);
		view.setTypeface(typeface);
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
