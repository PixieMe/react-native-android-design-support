package com.reactnativeandroiddesignsupport;

import android.support.design.widget.FloatingActionButton;
import android.view.View;
import android.view.ViewGroup;
import com.facebook.react.uimanager.LayoutShadowNode;
import com.facebook.yoga.YogaMeasureFunction;
import com.facebook.yoga.YogaMeasureMode;
import com.facebook.yoga.YogaMeasureOutput;
import com.facebook.yoga.YogaNode;

/**
 * Created by tim on 13/10/2016.
 */
public class ReactFloatingActionButtonNode extends LayoutShadowNode implements YogaMeasureFunction
{
	private int mWidth;
	private int mHeight;
	private boolean mMeasured;

	public ReactFloatingActionButtonNode()
	{
		setMeasureFunction(this);
	}


	@Override
	public long measure(YogaNode node, float width, YogaMeasureMode widthMode, float height, YogaMeasureMode heightMode)
	{
		if (!mMeasured)
		{
			FloatingActionButton nodeView = new FloatingActionButton(getThemedContext());
			final int spec = View.MeasureSpec.makeMeasureSpec(ViewGroup.LayoutParams.WRAP_CONTENT, View.MeasureSpec.UNSPECIFIED);
			nodeView.measure(spec, spec);
			mWidth = nodeView.getMeasuredWidth();
			mHeight = nodeView.getMeasuredHeight();
			mMeasured = true;
		}

		return YogaMeasureOutput.make(mWidth, mHeight);
	}
}
