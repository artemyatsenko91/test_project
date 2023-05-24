import dataInfo from "./data.json" assert { type: "json" };

window.addEventListener("load", () => {
    const tableHeaderLine = document.querySelector('.table_header_line');
    const table = document.querySelector('table');

    function generateUsers(data) {
        tableHeaderLine.innerHTML = ''
        let template = ""

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        data && data.map(item => {
            if (window.innerWidth >= 850) {
                template += `
                        <tr class="table_line">
                            <td>${item.name}</td>
                            <td>${item.company}</td>
                            <td>${item.phone}</td>
                            <td>${item.email}</td>
                            <td>${item.country}</td>
                            <td>
                                <button class="status_btn ${item.status}">
                                    ${capitalizeFirstLetter(item.status)}
                                </button>
                            </td>
                        </tr>`
            }
            else {
                template += `<tr class="table_line">
                                    <td class="table_link">${item.name}</td>
                                    <td>
                                        <button class="status_btn ${item.status}">
                                            ${capitalizeFirstLetter(item.status)}
                                        </button>
                                    </td>
                                </tr>`
            }
        })
        tableHeaderLine.insertAdjacentHTML('afterend', template);
    }

    function showMoreAboutUser() {
        table.addEventListener("click", (e) => {
            const userField = e.target
            if (e.target.classList.contains('table_link')) {
                const name = e.target.innerHTML
                dataInfo.tableInfo && dataInfo.tableInfo.map(item => {
                    if (item.name === name) {
                        userField.classList.add('open')
                        userField.innerHTML = `<td class="table_link">
                                                            <div class="user-info">
                                                                <span class="user-info_name">Name: ${item.name}</span>
                                                                <span>Company : ${item.company}</span>
                                                                <span>Phone Number : ${item.phone}</span>
                                                                <span>Email : ${item.email}</span>
                                                                <span>Country : ${item.country}</span>
                                                                <button class="hide_user_info">^</button>
                                                            </div>
                                                        </td>`
                        hideUserInfo(item.name)
                    }
                })
            }
        })
    }

    function hideUserInfo(name) {
        const hiseInfoBtn = document.querySelector('.hide_user_info')
        hiseInfoBtn.addEventListener('click', (e) => {
            const target = e.target.closest('.table_link')
            target.classList.remove('open')
            target.innerHTML = `<td class="table_link">${name}</td>`
        })
    }

    function generateTableHeaders() {
        const tableHeaders = document.querySelector('.table_header_line');
        let template = ""
        dataInfo.tableHeaders && dataInfo.tableHeaders.map(item => {
            if (window.innerWidth >= 850) {
                template += `<th> ${item.name}</th > `
            }
            else {
                if (item.name === "Customer Name" || item.name === "Status") {
                    template += `<th>${item.name}</th> `
                }
            }
        })

        tableHeaders.innerHTML = template;
        toggleListItemActivity()
    }

    function toggleStatusActivity() {
        table.addEventListener("click", (e) => {
            if (e.target.classList.contains('status_btn')) {
                if (e.target.classList.contains('active')) {
                    e.target.classList.remove('active')
                    e.target.classList.add('inactive')
                    e.target.innerHTML = "Inactive"
                } else {
                    e.target.classList.remove('inactive')
                    e.target.classList.add('active')
                    e.target.innerHTML = "Active"
                }
            }
        })
    }

    function showSideMenu() {
        const btnShowMenu = document.querySelector('.btn_show_menu');
        const sideMenu = document.querySelector('.side-menu')
        btnShowMenu.addEventListener("click", () => {
            sideMenu.classList.toggle('show')
            if (sideMenu.classList.contains('show')) {
                btnShowMenu.innerHTML = "<"
            } else {
                btnShowMenu.innerHTML = ">"
            }
        })
    }

    function removeUsers() {
        const usersInfo = document.querySelectorAll('.table_line');

        usersInfo && usersInfo.forEach(item => {
            item.remove();
        });
    }

    function toggleListItemActivity() {
        const listWrapper = document.querySelector('.side-menu__list')

        listWrapper.addEventListener("click", (e) => {
            const itemList = listWrapper.querySelectorAll('.list-item');
            const listItem = e.target

            itemList.forEach(item => {
                item.classList.remove('active')

                if (listItem.getAttribute('data-name') === item.getAttribute('data-name')) {
                    listItem.classList.add('active');
                }
            })
        })
    }

    function search() {
        const searchInput = document.querySelector('.header__search-input');

        searchInput.addEventListener('change', () => {
            let searchStr = searchInput.value;
            const searchValue = searchStr.trim().toLowerCase()
            const filteredData = dataInfo.tableInfo && dataInfo.tableInfo.filter(item => {
                console.log(item.name.toLowerCase())
                return (item.name.toLowerCase().includes(searchValue)
                    || item.company.toLowerCase().includes(searchValue) || item.email.toLowerCase().includes(searchValue))
            })
            removeUsers()
            generateUsers(filteredData)
        })
    }

    showSideMenu()
    search();
    toggleStatusActivity();
    generateUsers(dataInfo.tableInfo);
    showMoreAboutUser();
    generateTableHeaders()

});


