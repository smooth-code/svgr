import svgr from './'

// THROWS Argument of type 'null' is not assignable to parameter of type 'string'.
svgr(null)

// THROWS Argument of type 'undefined' is not assignable to parameter of type 'string'.
svgr(undefined)

// THROWS Expected 1-3 arguments, but got 0.
svgr()
