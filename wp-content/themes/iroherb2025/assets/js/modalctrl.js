jQuery(function ($) {


    let serachconditions = new Array();

    chkboxCtrl();
    deleteTags();
    selectAllChild();
    modalWindowCtrl();
    fkwCtrl();
    modalDirectSubmit();

    //ajaxUrlは呼び出し元のファイルで定義
    chkSeaechConditions(ajaxUrl);

    function chkSeaechConditions(ajaxUrl) {
        $.ajax({
            type: 'POST',
            url: ajaxUrl,
            // dataType: 'json',
            data: {
                'action': 'getJobSearchConditions',
            },
            success: function(response) {
                let res = JSON.parse(response, true);
                console.log(response);
                if (res['prefectures']) {
                    $.each(res['prefectures'], function(i, v) {
                        // console.log(i, v);
                        let itemid = 'prefectures[' + i + ']';
                        let itemid_escape = itemid.replace('[', '\\[').replace(']', '\\]');
                        $('.form-modal #' + itemid_escape).prop('checked', true).change();
                    });
                }
                if (res['jobtype']) {
                    $.each(res['jobtype'], function(i, v) {
                        // console.log(i, v);
                        let itemid = 'jobtype[' + i + ']';
                        let itemid_escape = itemid.replace('[', '\\[').replace(']', '\\]');
                        $('.form-modal #' + itemid_escape).prop('checked', true).change();
                    });
                }
                if (res['particular']) {
                    $.each(res['particular'], function(i, v) {
                        // console.log(i, v);
                        let itemid = 'particular[' + i + ']';
                        let itemid_escape = itemid.replace('[', '\\[').replace(']', '\\]');
                        $('.form-modal #' + itemid_escape).prop('checked', true).change();
                    });
                }

                if (res['chknew']) {
                    $("#chknew").prop('checked', true).change();
                }

                if (res['chkrecom']) {
                    $("#chkrecom").prop('checked', true).change();
                }
            }
        });
    }

    function chkboxCtrl() {
        console.log('test');
        $(".form-modal ._selitem").change(function () {
            let status = $(this).prop('checked');
            let id = $(this).attr('id');
            if (status == true) {
                let val = $(this).val();
                serachconditions[id] = val;
            } else {
                delete serachconditions[id];
            }
            modifySelItmes(serachconditions);
        });
    }

    function modifySelItmes(arr) {
        //消して描画し直す
        $("#jobFormTagArea").html('');
        $("#hiddenArea").html('');
        let addHtml;
        let addHiddens;
        for (let key in arr) {
            addHtml = '<a href="#" data-itemid="' + key + '" class="jobformtags _link">' + arr[key] + '</a>';
            $("#jobFormTagArea").append(addHtml);
            addHiddens = '<input type="hidden" name="' + key + '" value="' + arr[key] + '">';
            $("#hiddenArea").append(addHiddens);
        };

        console.log(arr);
    }

    function deleteTags() {
        //tagをクリックで消す
        $("body").on('click', '.jobformtags', function (e) {
            // console.log($("#particular_condition[24]").length);
            // $('#particular_condition[24]').show();
            e.preventDefault();
            let itemid = $(this).data('itemid');
            delete serachconditions[itemid];
            modifySelItmes(serachconditions);
            let itemid_escape = itemid.replace('[', '\\[').replace(']', '\\]');
            $('.form-modal #' + itemid_escape).prop('checked', false);

        })
    }

    function selectAllChild() {
        $(".form-modal ._selectall").change(function () {
            let status = $(this).prop('checked');
            if (status == true) {
                $(this).parents('.area').find('._selitem').prop('checked', true).change();
            } else {
                $(this).parents('.area').find('._selitem').prop('checked', false).change();
            }
        });
    }

    function fkwCtrl() {
        $("body").on('click', '#fkw .link', function (e) {
            e.preventDefault();
            let kw = $(this).data('kw');
            let addHiddensFkw = '<input type="hidden" name="fkw" value="' + kw + '">';
            $("#hiddenFkw").append(addHiddensFkw);
            $("#topFkwForm").submit();
        });
    }

    function modalDirectSubmit() {
        $("#modalSubmit").click(function (e) {
            e.preventDefault();
            $("#topSearchForm").submit();
        });
    }


    function modalWindowCtrl() {
        $('._modaltrig').click(function (e) {
            e.preventDefault();
            let target = $(this).data('target');
            console.log(target);
            const parentsNode = $(this).parents('._modalparent');
            parentsNode.css('zIndex', 9000);
            $("html,body").attr('style', "overflow:hidden !important");
            $(target).addClass('-show');
            $("#searchModal").addClass('-active');
            $("#searchModal").find('.modalcover').removeClass('-close').addClass('-active');
            $("#searchModal").find('.inner').removeClass('-close').addClass('-active');

        });
        $('._closemodal').click(function (e) {
            e.preventDefault();
            let target = $(this).parents('.modal-window');
            const parentsNode = $(this).parents('._modalparent');
            $("#searchModal").delay(500).queue(function () {
                $("#searchModal").removeClass('-active');
                $("#searchModal").stop();
                $(".form-modal").removeClass('-show');
                parentsNode.css('zIndex', 20);
                $("html,body").removeAttr("style");
            });
            $("#searchModal").find('.modalcover').removeClass('-active').addClass('-close');
            $("#searchModal").find('.inner').removeClass('-active').addClass('-close');
        });

        $("._stopPropagation").click(function (e) {
            e.stopPropagation();
        });
    }


});