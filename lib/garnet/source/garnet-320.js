(function(enyo, scope) {
	/**
	* <b>[Validating Value for "published" Property]</b>
	*
	*		A new value for a published property is validated in this case:
	*
	*		[] The property has a valid range
	*
	*		-	If the new value is a number and:
	*
	*			+ If the new value is smaller than the min value, then the min value is assigned.
	*
	*			+ If the new value is greater than the max value, then the max value is assigned.
	*
	* <b>[Cases for skipping Value Validation for "published" Property]</b>
	*
	*		[] CASE A: Common Case
	*
	*		-	The new value is not checked for valid data type.
	*
	*		-	Skipped when a value is simply being delivered to a browser. (e.g. Color value, Class string, Width, Height, etc.)
	*
	*		[] CASE B: The property has a valid range
	*
	*		-	The range's min value is not checked if it is less than the range's max value.
	*
	*		-	Skipped when a float is passed for the property of type Integer.
	*
	*		[] CASE C: The property has a valid range and is of type String
	*
	*		-	The new value is not checked if it is in the valid range.
	*
	*			e.g. "Pineapple" is not checked if it is in the valid range ["apple" "orange" "banana"]
	*
	*
	* @namespace g
	* @public
	*/
	g = {};

	/**
	* The width of a watch. It's a constant.
	* @private
	*/
	g.width = 320;

	/**
	* The height of a watch. It's a constant.
	* @private
	*/
	g.height = 320;

	/**
	* The width of a wheel. It's a constant.
	* @private
	*/
	g.wheelWidth = 20;

	/**
	* The width of touch sensing no wheel area. It's a constant.
	* @private
	*/
	g.wheelGestureWidth = 54;

})(enyo, this);
