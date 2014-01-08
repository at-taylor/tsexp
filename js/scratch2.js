( function( $, undefined ) {
    var counter = 0;
    $( document ).bind( "pageinit", function( e ) {
        $( "#prepend, #append", e.target ).on( "click", function( e ) {
            counter++;
            var widgetType = $( "[name='radio-widget']:checked" ).attr( "id" ),
                group = $( "#controlgroup" ),
                $el,
                action = function() {
                    var option = $( "[name='radio-option']:checked" ).attr( "id" );
                    $el[ option ](); group.controlgroup( "refresh" );
                };
            if ( widgetType === "link" ) {
                $el = $( "<a href='#'>Link " + counter + "</a>" ).bind( "click", action );
                $( "#controlgroup" ).controlgroup( "container" )[ $( this ).attr( "id" ) ]( $el );
                $el.buttonMarkup();
            } else if ( widgetType === "select" ) {
                $el = $( "<label for='widget" + counter + "'>Select " + counter + "</label><select id='widget" + counter + "'><option id='widget" + counter + "' value='default'>Select " + counter + "</option><option value='remove'>Select</option></select>" );
                $( $el[ 1 ] ).bind( "change", action);
                $( "#controlgroup" ).controlgroup( "container" )[ $( this ).attr( "id" ) ]( $el );
                $( $el[ 1 ] ).selectmenu();
            } else {
                $el = $( "<label for='widget" + counter + "'>Checkbox " + counter + "</label><input type='checkbox' id='widget" + counter + "'></input>" );
                $( $el[ 1 ] ).bind( "change", action );
                $( "#controlgroup" ).controlgroup( "container" )[ $( this ).attr( "id" ) ]( $el );
                $( $el[ 1 ] ).checkboxradio();
            }
            group.controlgroup( "refresh" );
        });
        $( "[name='radio-orientation']" ).bind( "change", function( e ) {
            $( "#controlgroup" ).controlgroup( "option", "type", ( $( "#isHorizontal" ).is( ":checked" ) ? "horizontal" : "vertical" ) );
        });
    });
})( jQuery );


//console.log("mediaEditPage: count the number of options which exist prior to running the dynamic build:");
//console.log("note the dyn build is commented out");
//console.log($('#editCategoryList option').size());

//        $.getJSON(tsServiceURLDomain + "tssvc/resourcesS/categories", function(data) {
//
//            $('#editCategoryList option').remove();       // clear previous entries
//
//            cat = data.categoryModelList;
//            $.each(cat, function(index, item) {
//                var optionListItem = "<option value='" + item.categoryId + "'>" +item.categoryDescr + "</option>";
//                $('#editCategoryList').append(optionListItem);
//            });
//
//            // make selected any items that are in the result array
//            //console.log("Category Array outer processing.  Length: " + categoryResultArray.length) ;
//            for(i = 0; i < categoryResultArray.length; i++) {
//                //console.log("value at index: " + i + " is " + categoryResultArray[i] )
//                $("#editCategoryList option[value='"+categoryResultArray[i]+"']").attr('selected', 'selected');
//            }
//            $('#editCategoryList').selectmenu("refresh", true);
//        });