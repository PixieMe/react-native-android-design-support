package com.reactnativeandroiddesignsupport;

import android.content.res.ColorStateList;
import android.graphics.Color;
import android.view.View;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.LayoutShadowNode;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

/**
 * Created by tim on 13/10/2016.
 */
public class ReactFloatingActionButtonManager extends SimpleViewManager<ReactFloatingActionButton>
{
	@Override
	public String getName()
	{
		return "RCTFloatingActionButtonAndroid";
	}

	@Override
	protected ReactFloatingActionButton createViewInstance(ThemedReactContext themedReactContext)
	{
		ReactFloatingActionButton fab = new ReactFloatingActionButton(themedReactContext);
		fab.setOnClickListener(new FloatingActionButtonListener());
		return fab;
	}

	@Override
	public LayoutShadowNode createShadowNodeInstance()
	{
		return new ReactFloatingActionButtonNode();
	}

	@Override
	public Class getShadowNodeClass()
	{
		return ReactFloatingActionButtonNode.class;
	}

	@ReactProp(name = "icon")
	public void setIcon(ReactFloatingActionButton view, @Nullable ReadableMap icon)
	{
		view.setIcon(icon);
	}

	@Override
	@ReactProp(name = "backgroundColor",
	           defaultInt = Color.RED,
	           customType = "Color")
	public void setBackgroundColor(ReactFloatingActionButton button, int bgColor)
	{
		button.setBackgroundTintList(ColorStateList.valueOf(bgColor));
	}

	@ReactProp(name = "color",
	           defaultInt = Color.YELLOW,
	           customType = "Color")
	public void setColor(ReactFloatingActionButton button, int textColor)
	{
		button.setRippleColor(textColor);
	}

	public class FloatingActionButtonListener implements View.OnClickListener
	{
		@Override
		public void onClick(View v)
		{
			WritableMap event = Arguments.createMap();
			ReactContext reactContext = (ReactContext) v.getContext();
			reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(v.getId(), "topChange", event);
		}
	}
}
