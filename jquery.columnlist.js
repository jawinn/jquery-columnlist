// jquery.columnlist.js
// @weblinc, @jsantell (c) 2012

// MODIFIED by Josh Winn
// --Better remnants/remainder handling for 3+ columns.
// --Additional classes for styling
// --Allow remainder in center column instead of left
(function( $ ) {
    $.fn.columnlist = function ( options ) {
        options = $.extend( {}, $.fn.columnlist.defaults, options );
        return this.each(function () {
            var
              $list     = $( this ),
              size      = options.size || $list.data( 'columnList' ) || 1,
              $children = $list.children( 'li' ),
              perColumn = Math.floor( $children.length / size ),
              remainder = ($children.length % size),
              $column;

            // add class to parent list that's being split
            $list.addClass(
              options[ 'class' ] + '-parent ' +   // for styling parent
              options[ 'class' ] + '-' + size +   // for styling different column numbers
              ' clearfix'
            );

            // create columns. 
            var perThisColumn;
            var childIndex = 0;
            for (var i = 0; i < size; i++) {
                $column = $('<ul />').appendTo( returnColumn( i ) );
                
                // handle remainders better
                perThisColumn = perColumn;

                if ( options['remainderPlacement'] == 'center' )
                {
                  if (remainder == 1 && size == 3){
                    if (i == 1){
                      // put single remainder in middle column
                      perThisColumn = perThisColumn + 1; 
                    }
                  } 
                  else {
                    // default, put remainder in left to right cols
                    if (i < remainder){ perThisColumn = perThisColumn + 1; }
                  }  
                } 
                // options['remainderPlacement'] == 'left'
                else {
                    // default, put remainder in left to right cols
                    if (i < remainder){ perThisColumn = perThisColumn + 1; }
                }

                
                // append list items to new columns
                for ( var j = 0; j < perThisColumn; j++ ) 
                {
                    if ( $children.length > childIndex ) {
                      $column.append( $children[ childIndex ]);
                    }
                    childIndex++;
                }
                // append the column
                $list.append( $column.parent() );
            }
        });
        function returnColumn ( inc ) {
            return $('<li class="' + options.incrementClass + inc + ' ' + options[ 'class' ] + '"></li>');
        }
    };
    $.fn.columnlist.defaults = {
        'class'        : 'column-list',
        'incrementClass' : 'column-list-',
        'remainderPlacement' : 'left' // also accepts 'center'
    };
})( jQuery );
