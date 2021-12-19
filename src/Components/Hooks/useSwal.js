import swal from "sweetalert";

const useSwal = () => {

    //USE TO SHOW MODAL
    const openSwal = (title, icon) => {
        swal(title, {
            icon: icon
        })
    }

    //USE TO SHOW FOR CONDITIONAL DECISIONS
    const swalModal = (title, url, render, setrender) => {
        swal({
            title: title,
            text: "You can not undo your decision",
            icon: "warning",
            buttons: true,
            dangerMode: true
        })
            .then(willDelete => {
                if (willDelete) {
                    fetch(url, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount > 0) {
                                setrender(!render);
                                openSwal('Deleted', 'success');
                            }
                            else {
                                openSwal("Somthing went wrong!", "Warning");
                            }
                        })
                }
            })
    }

    //USE TO SHOW ON POST METHODS
    const postSwal = (url, data, successTitle, errorTitle, reset) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    openSwal(successTitle, 'success')
                    reset();
                }
                else {
                    openSwal(errorTitle, 'warning')
                }
            })
    }
    return {
        swalModal,
        openSwal,
        postSwal
    }
}
export default useSwal; 