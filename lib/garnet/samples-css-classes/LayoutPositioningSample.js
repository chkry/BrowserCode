enyo.kind({
	name: "g.sample.LayoutPositioningSample",
	kind: "enyo.Scroller",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Layout Positioning Sample", classes: "g-sample-header", ontap: "goBack"},
		{kind: "enyo.Scroller", components: [
			{content: "With g-layout-absolute-wrapper", classes: "g-sample-subheader"},
			{style: "border-radius: 50%; background-color: black; display: inline-block;", classes: "g-layout-absolute-wrapper g-common-width-height-fit", components: [
				//
				{kind: "g.IconButton", src: "assets/icon-favorite.png", classes: "center middle"},
				{kind: "g.IconButton", src: "assets/icon-favorite.png", classes: "left"},
				{kind: "g.IconButton", src: "assets/icon-favorite.png", classes: "right"},
				{kind: "g.IconButton", src: "assets/icon-favorite.png", classes: "top"},
				{kind: "g.IconButton", src: "assets/icon-favorite.png", classes: "bottom"},
				{classes: "g-layout-box-inside-circle-no-wheel g-layout-absolute-wrapper", components: [
					{kind: "g.IconButton", src: "assets/icon-favorite.png", classes: "left top"},
					{kind: "g.IconButton", src: "assets/icon-favorite.png", classes: "right top"},
					{kind: "g.IconButton", src: "assets/icon-favorite.png", classes: "left bottom"},
					{kind: "g.IconButton", src: "assets/icon-favorite.png", classes: "right bottom"}
				]},
				//
				{kind: "g.IconButton", src: "assets/icon-extend.png", classes: "left", style: "margin-left: 42px; background-color: white;"},
				{kind: "g.IconButton", src: "assets/icon-extend.png", classes: "right", style: "margin-right: 42px; background-color: white;"},
				{kind: "g.IconButton", src: "assets/icon-extend.png", classes: "top", style: "margin-top: 42px; background-color: white;"},
				{kind: "g.IconButton", src: "assets/icon-extend.png", classes: "bottom", style: "margin-bottom: 42px; background-color: white;"},
				{classes: "g-layout-box-inside-circle-no-wheel g-layout-absolute-wrapper", components: [
					{kind: "g.IconButton", src: "assets/icon-extend.png", classes: "left top", style: "margin-left: 42px; margin-top: 42px; background-color: white;"},
					{kind: "g.IconButton", src: "assets/icon-extend.png", classes: "right top", style: "margin-right: 42px; margin-top: 42px; background-color: white;"},
					{kind: "g.IconButton", src: "assets/icon-extend.png", classes: "left bottom", style: "margin-left: 42px; margin-bottom: 42px; background-color: white;"},
					{kind: "g.IconButton", src: "assets/icon-extend.png", classes: "right bottom", style: "margin-right: 42px; margin-bottom: 42px; background-color: white;"}
				]}
			]},
			{style: "border-radius: 50%; background-color: black; display: inline-block;", classes: "g-layout-absolute-wrapper g-common-width-height-fit", components: [
				{classes: "g-layout-box-outside-circle-no-wheel g-layout-absolute-wrapper", components: [
					{kind: "g.IconButton", src: "assets/icon-favorite.png", classes: "left"},
					{kind: "g.IconButton", src: "assets/icon-favorite.png", classes: "right"},
					{kind: "g.IconButton", src: "assets/icon-favorite.png", classes: "top"},
					{kind: "g.IconButton", src: "assets/icon-favorite.png", classes: "bottom"}
				]},
				{classes: "g-layout-box-inside-circle g-layout-absolute-wrapper", components: [
					{kind: "g.IconButton", src: "assets/icon-favorite.png", classes: "left top"},
					{kind: "g.IconButton", src: "assets/icon-favorite.png", classes: "right top"},
					{kind: "g.IconButton", src: "assets/icon-favorite.png", classes: "left bottom"},
					{kind: "g.IconButton", src: "assets/icon-favorite.png", classes: "right bottom"}
				]}
			]},

			{content: "Setting Main with layout positioning", classes: "g-sample-subheader"},
			{style: "border-radius: 50%; background-color: black; display: inline-block;", classes: "g-layout-absolute-wrapper g-common-width-height-fit", components: [
				{classes: "g-layout-absolute-center g-sample-setting", style: "width: 150px; height: 150px;", components: [
					{classes: "g-layout-absolute-wrapper", style: "width: 100%; height: 100%; background-color: gray;", components: [
						{kind: "g.IconButton", src: "assets/icon-favorite.png", classes: "left top"},
						{kind: "g.IconButton", src: "assets/icon-favorite.png", classes: "right top"},
						{kind: "g.IconButton", src: "assets/icon-favorite.png", classes: "left bottom"},
						{kind: "g.IconButton", src: "assets/icon-favorite.png", classes: "right bottom"}
					]}
				]}
			]}
		]}
	],
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	}
});
