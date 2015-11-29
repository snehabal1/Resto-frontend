/**
* Table js
* Author: Sneha Thazhathethil
* Date created: 29 Nov 2015
*/


(function(namespace) {
    var updateTables = function(data) {
        if (!data) {
            //console.error('No data available');
            return false;
        }
        // For all the tables do
        data.forEach(function(tableData) {
            // Get the required table
            var $table = $('.resto-table[table-no=' + tableData.tableno + ']');
            // Check for service,order-placed etc flags 
            if (tableData.orderplaced) {
                $table.addClass('order-placed');
            }
            else {
                $table.removeClass('order-placed');
            }

            if (tableData.servicereqd) {
                $table.addClass('service-reqd');
            }
            else {
                $table.removeClass('service-reqd');
            }
            // Bind the data to the table div
            $table.data({
                orders: tableData.orders
            })
        });
    }
    var showModal = function(orders) {
        var $modal = $('#order-placed-modal'),
            $order = null,
            $oList = $modal.find('.orders-list');

        // Flush old orders
        $oList.empty();
        // Loop within the orders
        orders.forEach(function(order) {
            $order = $('<li>', {
                'class': 'list-group-item'
            });
            $orderTitle = $('<div>', {
                'class': 'order-title'
            });
            $orderCat = $('<div>', {
                'class': 'order-category'
            });
            $orderType = $('<div>', {
                'class': 'order-type'
            });
            $orderGluten = $('<div>', {
                'class': 'order-gluten'
            });
            $orderPrice = $('<div>');

            // Append order prperties
            $orderTitle.append(order.title);
            $orderCat.append(order.category);
            if (order.veg) {
                $orderType.append('Veg');
            }
            else {
                $orderType.append('Non-Veg');
            }
            if (order.glutenfree) {
                $orderGluten.append('Gluten-Free');
            }
            $orderPrice.append(order.price);
            // Append order details    
            $order.append($orderTitle);
            $order.append($orderCat);
            $order.append($orderType);
            $order.append($orderGluten);
            $order.append($orderPrice);
            // Append order item to master list
            $oList.append($order);
        });
        // Show the modal
        $modal.modal('show');
    }
    var onTableClick = function() {
        var $this = $(this);
        // Rrmove the service-reqd-color if the table has been catered
        if ($this.hasClass('service-reqd')) {
            $this.removeClass('service-reqd');
        }
        // Show order modal if the table has done placing the order
        if ($this.hasClass('order-placed')) {
            $('#modal-save').off().on('click', function() {
                // Rrmove the order-placed-color if the kitchen has processed it and hide the modal
                $('#order-placed-modal').modal('hide');
                $this.removeClass('order-placed');

            });
            // Display the order contents in the modal
            showModal($this.data().orders);
        }
    }
    var createTable = function(_data) {
        var data = typeof _data === 'object' ? _data : {},
            tableNo = data.tableNo || 1,
            // The table div
            $table = $('<div>', {
                'class': 'resto-table outline',
                'table-no': tableNo
            }),
            // A wrapper for table contents like table
            $tableContent = $('<div>', {
                'class': 'resto-table-content'
            }),
            $tableNo = $('<span>', {
                'class': 'resto-table-number'
            });
        // Append table contents
        $tableNo.append(tableNo);
        $tableContent.append($tableNo);
        $table.append($tableContent);
        // Attach table events
        $table.on({
            click: onTableClick
        });
        // Return table div
        return $table;
    }
    var createTables = function(_tableCount) {
        var $tableContainer = $('.resto-tables'),
            defaultTables = 20,
            maxTablesInRow = 5,
            tableCount = typeof _tableCount === 'undefined' ? defaultTables : _tableCount,
            i = 1,
            $table = null,
            tableData = null;
        // Creating the required table divs
        for (; i <= tableCount; i += 1) {
            tableData = {
                tableNo: i
            };
            $table = createTable(tableData);
            // Append table to the table container
            $tableContainer.append($table);
            if (i % maxTablesInRow === 0) {
                // Append a line break after maxTablesInRow
                $tableContainer.append('<div class="breaker"></div>')
            }
        }
    };

    // Dummy poll function
    //var pollCallback = function() {
    //    console.log('Polling ...');
    //    if (!window.stopPoll) {
    //        requestAnimationFrame(pollCallback);
    //    }
    //};
    //var pollServer = requestAnimationFrame(pollCallback);

    $(document).ready(function() {
        createTables(10);
        // Dummy data
        var data = [{
            "tableno": 1,
            "loggedin": true,
            "orderplaced": false,
            "ordercompleted": false,
            "servicereqd": true,
            "orders": [{
                "title": "Pepsi",
                "veg": true,
                "text": "desc",
                "category": "entree",
                "picture": "",
                "price": 15,
                "glutenfree": true
            },
              {
                  "title": "Pepsi",
                  "veg": true,
                  "text": "desc",
                  "category": "entree",
                  "picture": "",
                  "price": 15,
                  "glutenfree": true
              }]
        }, {
            "tableno": 4,
            "loggedin": true,
            "orderplaced": true,
            "ordercompleted": false,
            "servicereqd": false,
            "orders": [{
                "title": "Sandwich",
                "veg": true,
                "text": "desc",
                "category": "entree",
                "picture": "",
                "price": 15,
                "glutenfree": true
            },
              {
                  "title": "Burger",
                  "veg": true,
                  "text": "desc",
                  "category": "entree",
                  "picture": "",
                  "price": 15,
                  "glutenfree": true
              }]
        }]
        // Calling update tables with dummy data for testing 
        updateTables(data);
    })

})(window);