enyo.kind({
	name: "g.sample.LayoutFlexSample",
	kind: "enyo.Scroller",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Layout Flex Sample", classes: "g-sample-header", ontap: "goBack"},
		{kind: "enyo.Scroller", components: [
			{content: "Setting Main with Flex Columns", classes: "g-sample-subheader"},
			{style: "border-radius: 50%; background-color: black; display: inline-block;", classes: "g-layout-absolute-wrapper g-common-width-height-fit", components: [
				{classes: "g-layout-box-inside-circle", components: [
					{kind: "enyo.Table", classes: "g-layout fixed g-sample-setting", components:[
						{components: [
							{classes: "flex"},
							{style: "width: 42px;", components: [
								{kind: "g.IconButton", src: "assets/icon-favorite.png"}
							]},
							{classes: "flex"},
							{classes: "flex"},
							{style: "width: 42px;", components: [
								{kind: "g.IconButton", src: "assets/icon-favorite.png"}
							]},
							{classes: "flex"}
						]},
						{components: [
							{classes: "flex"},
							{style: "width: 42px;", components: [
								{kind: "g.IconButton", src: "assets/icon-favorite.png"}
							]},
							{classes: "flex"},
							{classes: "flex"},
							{style: "width: 42px;", components: [
								{kind: "g.IconButton", src: "assets/icon-favorite.png"}
							]},
							{classes: "flex"}
						]}
					]}
				]}
			]},

			{style: "border-radius: 50%; background-color: black; display: inline-block;", classes: "g-layout-absolute-wrapper g-common-width-height-fit", components: [
				{classes: "g-layout-box-inside-circle", components: [
					{kind: "enyo.Table", classes: "g-layout fixed g-sample-setting", components: [
						{components: [
							{style: "width: 30%"},
							{style: "width: 42px;", components: [
								{kind: "g.IconButton", src: "assets/icon-favorite.png"}
							]},
							{style: "width: 20%"},
							{style: "width: 20%"},
							{style: "width: 42px;", components: [
								{kind: "g.IconButton", src: "assets/icon-favorite.png"}
							]},
							{style: "width: 30%"}
						]},
						{components: [
							{style: "width: 30%"},
							{style: "width: 42px;", components: [
								{kind: "g.IconButton", src: "assets/icon-favorite.png"}
							]},
							{style: "width: 20%"},
							{style: "width: 20%"},
							{style: "width: 42px;", components: [
								{kind: "g.IconButton", src: "assets/icon-favorite.png"}
							]},
							{style: "width: 30%"}
						]}
					]}
				]}
			]},

			{content: "Flex Columns : 640px width", classes: "g-sample-subheader"},
			{components: [

				{content: "g-layout fixed : Sized, Stretched, or Fixed Table", classes: "g-sample-description"},
				{kind: "enyo.Table", classes: "g-layout fixed", style: "width: 640px;", components:[
					{components: [
						{style: "width: 128px;", content: "128px"},
						{style: "width: 20%;", content: "20%"},
						{style: "width: 64px;", content: "64px"},
						{classes: "flex", content: "auto flex"},
						{classes: "flex", content: "auto flex"}
					]}
				]},

				{content: "g-layout fixed : Fixed - Oversized", classes: "g-sample-description"},
				{kind: "enyo.Table", classes: "g-layout fixed", style: "width: 640px;", components:[
					{components: [
						{style: "width: 128px;", content: "128px"},
						{style: "width: 20%;", content: "20%"},
						{style: "width: 512px;", content: "512px"},
						{classes: "flex", content: "auto flex"},
						{classes: "flex", content: "auto flex"}
					]}
				]},

				{content: "g-layout fixed : Only flex", classes: "g-sample-description"},
				{kind: "enyo.Table", classes: "g-layout fixed", style: "width: 640px;", components:[
					{components: [
						{classes: "flex", content: "auto flex"},
						{classes: "flex", content: "auto flex"},
						{classes: "flex", content: "auto flex"},
						{classes: "flex", content: "auto flex"},
						{classes: "flex", content: "auto flex"}
					]}
				]},

				{content: "g-layout auto : Sized or Stretched", classes: "g-sample-description"},
				{kind: "enyo.Table", classes: "g-layout auto", style: "width: 640px;", components:[
					{components: [
						{style: "width: 128px;", content: "128px"},
						{style: "width: 20%;", content: "20%"},
						{style: "width: 64px;", content: "64px"},
						{classes: "flex", content: "auto flex"},
						{classes: "flex", content: "auto flex"}
					]}
				]},

				{content: "g-layout auto : Sized or Stretched - Oversized", classes: "g-sample-description"},
				{kind: "enyo.Table", classes: "g-layout auto", style: "width: 640px;", components:[
					{components: [
						{style: "width: 128px;", content: "128px"},
						{style: "width: 20%;", content: "20%"},
						{style: "width: 512px;", content: "512px"},
						{classes: "flex", content: "auto flex"},
						{classes: "flex", content: "auto flex"}
					]}
				]},

				{content: "g-layout auto : Only flex", classes: "g-sample-description"},
				{kind: "enyo.Table", classes: "g-layout auto", style: "width: 640px;", components:[
					{components: [
						{classes: "flex", style: "width: 10px", content: "10px"},
						{classes: "flex", style: "width: 30px", content: "30px"},
						{classes: "flex", style: "width: 50px", content: "50px"},
						{classes: "flex", style: "width: 70px", content: "70px"},
						{classes: "flex", style: "width: 90px", content: "90px"}
					]}
				]}
			]},

			{content: "Flex Columns : 320px width", classes: "g-sample-subheader"},
			{components: [

				{content: "g-layout fixed : Sized, Stretched, or Fixed Table", classes: "g-sample-description"},
				{kind: "enyo.Table", classes: "g-layout fixed ", style: "width: 320px;", components:[
					{components: [
						{style: "width: 128px;", content: "128px"},
						{style: "width: 20%;", content: "20%"},
						{style: "width: 64px;", content: "64px"},
						{classes: "flex", content: "auto flex"},
						{classes: "flex", content: "auto flex"}
					]}
				]},

				{content: "g-layout fixed : Fixed - Oversized", classes: "g-sample-description"},
				{kind: "enyo.Table", classes: "g-layout fixed ", style: "width: 320px;", components:[
					{components: [
						{style: "width: 128px;", content: "128px"},
						{style: "width: 20%;", content: "20%"},
						{style: "width: 512px;", content: "512px"},
						{classes: "flex", content: "auto flex"},
						{classes: "flex", content: "auto flex"}
					]}
				]},

				{content: "g-layout fixed : Only flex", classes: "g-sample-description"},
				{kind: "enyo.Table", classes: "g-layout fixed ", style: "width: 320px;", components:[
					{components: [
						{classes: "flex", content: "auto flex"},
						{classes: "flex", content: "auto flex"},
						{classes: "flex", content: "auto flex"},
						{classes: "flex", content: "auto flex"},
						{classes: "flex", content: "auto flex"}
					]}
				]},

				{content: "g-layout auto : Sized or Stretched", classes: "g-sample-description"},
				{kind: "enyo.Table", classes: "g-layout auto ", style: "width: 320px;", components:[
					{components: [
						{style: "width: 128px;", content: "128px"},
						{style: "width: 20%;", content: "20%"},
						{style: "width: 64px;", content: "64px"},
						{classes: "flex", content: "auto flex"},
						{classes: "flex", content: "auto flex"}
					]}
				]},

				{content: "g-layout auto : Sized or Stretched - Oversized", classes: "g-sample-description"},
				{kind: "enyo.Table", classes: "g-layout auto ", style: "width: 320px;", components:[
					{components: [
						{style: "width: 128px;", content: "128px"},
						{style: "width: 20%;", content: "20%"},
						{style: "width: 128px;", content: "128px"},
						{classes: "flex", content: "auto flex"},
						{classes: "flex", content: "auto flex"}
					]}
				]},

				{content: "g-layout auto : Only flex", classes: "g-sample-description"},
				{kind: "enyo.Table", classes: "g-layout auto ", style: "width: 320px;", components:[
					{components: [
						{classes: "flex", style: "width: 10px", content: "10px"},
						{classes: "flex", style: "width: 30px", content: "30px"},
						{classes: "flex", style: "width: 50px", content: "50px"},
						{classes: "flex", style: "width: 70px", content: "70px"},
						{classes: "flex", style: "width: 90px", content: "90px"}
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
