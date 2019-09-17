package com.reactnativeandroiddesignsupport;

import android.util.Log;
import android.view.View;
import android.view.ViewGroup;

import androidx.coordinatorlayout.widget.CoordinatorLayout;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.google.android.material.appbar.AppBarLayout;

public class ReactCoordinatorLayoutManager extends ViewGroupManager<CoordinatorLayout>
{
	@Override
	public String getName()
	{
		return "RCTCoordinatorLayoutAndroid";
	}

	@Override
	public CoordinatorLayout createViewInstance(ThemedReactContext context)
	{
		return new CoordinatorLayout(context);
	}

	@Override
	public boolean needsCustomLayoutForChildren()
	{
		return true;
	}

	@Override
	public void addView(CoordinatorLayout parent, View child, int index)
	{
		Log.d("3SC", "CoordinatorLayout addView " + child);

		if (child instanceof AppBarLayout)
		{
			CoordinatorLayout.LayoutParams layoutParams = new CoordinatorLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,
			                                                                                 ViewGroup.LayoutParams.WRAP_CONTENT);
			layoutParams.setBehavior(new AppBarLayout.Behavior());
			child.setLayoutParams(layoutParams);
		}
		else
		{
			CoordinatorLayout.LayoutParams layoutParams = new CoordinatorLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,
			                                                                                 ViewGroup.LayoutParams.MATCH_PARENT);
			layoutParams.setBehavior(new AppBarLayout.ScrollingViewBehavior());
			child.setLayoutParams(layoutParams);
		}

		super.addView(parent, child, index);
	}
}
