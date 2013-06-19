/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
(function () {

    Ext.namespace('Ext.books');
    var student_list_url = 'models/BookList.php';
    var student_list_url_fields = ['title', 'Byear_month'];
	var delete_book_record = 'models/DeleteBook.php'
	
	var BThTitle = "";

    var student_list_store = Ext.create('Ext.data.Store', {
        storeId: 'student_list_url_fields',
        proxy: {
            type: 'ajax',
            url: student_list_url,
            reader: {
                type: 'json',
                root: 'results'
            }
        },
        autoLoad: true,
        fields: student_list_url_fields
    });


    var transaction_fields = [{
        xtype: 'datefield',
        name: 'bdate',
        id: 'txtdate',
        fieldLabel: 'Date',
        readOnly: false,
        allowBlank: false,
        labelWidth: 100,
        width: 280,
		format:'M Y'
    }, {
        xtype: 'textfield',
        name: 'title',
        id: 'txttitle',
        fieldLabel: 'Title',
        readOnly: false,
        allowBlank: false,
        labelWidth: 100,
        width: 720
    }, {
        xtype: 'filefield',
        width: 600,
        id: 'txtAbstract',
        emptyText: 'Select a file',
        fieldLabel: 'Abstract',
        name: 'photo-path[]',
        buttonText: 'Browse...'
    }, {
        xtype: 'filefield',
        width: 600,
        id: 'txtChapter1',
        emptyText: 'Select a file',
        fieldLabel: 'Thesis ',
        name: 'photo-path[]',
        buttonText: 'Browse...'
    }];

    Ext.define('MyDesktop.AccordionWindow', {
        extend: 'Ext.ux.desktop.Module',

        requires: [
            'Ext.data.ArrayStore',
            'Ext.util.Format',
            'Ext.grid.Panel',
            'Ext.grid.RowNumberer'
            //'Ext.form.field.TextArea'
        ],

        id: 'Books',

        init: function () {
            this.launcher = {
                text: 'Books',
                iconCls: 'notepad'
            }
        },

        createWindow: function () {
            var desktop = this.app.getDesktop();
            var win = desktop.getWindow('books');
            if (!win) {
                win = desktop.createWindow({
                    id: 'books',
                    title: 'MANAGE BOOKS',
                    width: 1100,
                    height: 600,
                    iconCls: 'notepad',
                    animCollapse: false,
                    border: false,
                    layout: 'fit',
                    hideMode: 'offsets',

                    layout: 'fit',
                    items: [{
                        xtype: 'grid',
                        id: 'books_list_grid',
                        store: student_list_store,
                        columns: [
                            new Ext.grid.RowNumberer(), {
                                text: "Title",
                                width: 900,
                                sortable: true,
                                dataIndex: 'title'
                            }, {
                                text: "Month & Year",
                                width: 160,
                                sortable: true,
                                dataIndex: 'Byear_month'
                            }
                        ],
                        listeners: {
                            selectionchange: function (view, selections, options) {
                                var gridBP = Ext.getCmp('books_list_grid');
                                sm = gridBP.getSelectionModel();
                                if (sm.hasSelection()) {
                                    selections = sm.getSelection();
                                    Ext.books.BThTitle = selections[0].raw.title;
                                }
                            }
                        }

                    }],
                    tbar: [{
                        text: 'Add',
                        tooltip: 'Add Record',
                        iconCls: 'add',
                        handler: function () {
                            NewRecord(1);
                        }
                    }, '-', {
                        text: 'Remove',
                        tooltip: 'Remove Record',
                        iconCls: 'remove',
                        handler: function () {
                            DeleteRecord(Ext.books.BThTitle);
                        }

                    }]
                });
            }
            return win;
        }


    });

    function NewRecord(Number) {
        var NewRecordWin;
        var NewRecordForm = new Ext.form.Panel({
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                msgTarget: 'side',
                bodyPadding: 10,
                items: [{
                    xtype: 'panel',
                    layout: 'column',
                    border: false,
                    items: [{
                        xtype: 'fieldset',
                        id: 'transaction_panel',
                        colspan: 2,
                        width: 780,
                        border: false,
                        style: 'margin-right: 5px',
                        items: transaction_fields
                    }], //end items panel
                }],
                buttons: [{
                    text: 'Upload',
                    handler: function () {
                        var form = this.up('form').getForm();
                        if (form.isValid()) {
                            form.submit({
                                url: 'models/PDFUploader.php',
                                waitMsg: 'Uploading your photo...',
                                scope: this,
                                success: function (formPanel, action) {
                                    var data = Ext.decode(action.response.responseText);
                                    Ext.Msg.alert("Success", "" + data.msg);
									Ext.getCmp('books_list_grid').getView().getStore().load();
									
                                },
                                failure: function (formPanel, action) {
                                    var data = Ext.decode(action.response.responseText);
                                    Ext.Msg.alert("Failure", "" + data.msg);
                                }
                            });
                        }


                    }
                }, {
                    text: 'Close',
                    handler: function () {
						Ext.getCmp('books_list_grid').getView().getStore().load();
                        this.up('form').getForm().reset();
                        this.up('window').close();
                        this.up('window').destroy();
                    }
                }]
                //end buttons
            } // end of layout
        ); //end widget

        NewRecordWin = Ext.widget('window', {
            title: 'Add New Book',
            closeAction: 'destroy',
            width: 800,
            height: 210,
            layout: 'fit',
            resizable: true,
            modal: true,
            items: NewRecordForm

        });

        if (Number == 1) {
            ClearFields();
        }

        NewRecordWin.show();
    }

    function DeleteRecord(ID) {
	
		var success = function (response) {		
		var resp = Ext.JSON.decode(response.responseText);
		if(resp.success){}
			Ext.Msg.alert("Delete Record","Successfully Deleted Book!");
			Ext.getCmp('books_list_grid').getView().getStore().load();
		}
		
        Ext.Msg.confirm('Delete', 'Are you sure you want to delete the book ' + ID+ '?', function (button) {
            if (button == 'yes') {
                Ext.Ajax.request({
                    url: delete_book_record,
                    params: {
                        dirName: Ext.books.BThTitle
                    },
                    success: success
                });
            }
        });
		
    }

    function ClearFields() {}

})();