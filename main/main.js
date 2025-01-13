$(document).ready(function () {
    let main_checkbox = document.getElementsByClassName("main_checkbox");
    let sub_checkbox = document.getElementsByClassName("sub_checkbox");
    let sub_div = document.getElementsByClassName("sub_div");
    let problem_type = document.getElementsByClassName("hidden_radio");
    let problem_area = document.getElementById("problem_area");

    Array.from(problem_type).forEach(el => {
        el.addEventListener('change', () => {
            Array.from(problem_type).forEach(e => {
                console.log(e.checked, e.id);
                if (e.checked)
                    document.getElementById(`${e.id}_option`).style.display = "flex";
                else
                    document.getElementById(`${e.id}_option`).style.display = "none";
            });
        })
    });

    Array.from(main_checkbox).forEach((e, i) => {
        e.addEventListener('change', () => {
            Array.from(sub_div[i].getElementsByClassName("sub_checkbox")).forEach(element => {
                element.checked = e.checked;
            })
        })
    });

    Array.from(sub_checkbox).forEach(e => {
        e.addEventListener('change', () => {
            checkMainCheckbox(e);
        });
    });

    function checkMainCheckbox(e) {
        const tmp = e.closest('.sub_div');
        const index = Array.from(sub_div).indexOf(tmp);
        const allSubChecked = Array.from(sub_div[index].getElementsByClassName("sub_checkbox"))
            .every(sub => sub.checked);
        main_checkbox[index].checked = allSubChecked;
    }




    const basePath = './';
    const fileExtension = '.txt';
    let str = '';
    $.ajax({
        url: `${basePath}testproblem1${fileExtension}`,
        datatype: 'text',
        success: function (data) {
            renderLatex(data);
        },
        error: function (xhr, status, error) {
            console.error('파일을 읽는 데 오류가 발생했습니다:', error);
        }
    });
    //problem_area.innerText = `\\(${str}\\)`;
    function renderLatex(str) {
        let latexText = str;
        let container = document.getElementById('problem_area');
        container.innerHTML = '$$' + latexText + '$$';  // MathJax에서 렌더링할 수 있는 형식으로 수식 설정
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, container]);  // MathJax로 수식 렌더링
    }
});