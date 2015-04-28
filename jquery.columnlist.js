// jquery.columnlist.js
// @weblinc, @jsantell (c) 2012

// MODIFIED by Josh Winn
// --Better remnants/remainder handling for 3+ columns.
// --Additional classes for styling
;(function( $ ) {
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

            console.log(perColumn);
            console.log(remainder);

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
                if (i < remainder){ perThisColumn = perThisColumn + 1; }
                console.log("perthiscol",perThisColumn);
                
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
        incrementClass : 'column-list-'
    };
})( jQuery );
