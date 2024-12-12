// Khởi tạo danh sách sản phẩm
function createProduct() {
    if (localStorage.getItem('products') === null) {
        // Sử dụng AJAX để lấy dữ liệu từ server
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "get_products.php", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Chuyển đổi dữ liệu JSON thành đối tượng JavaScript
                let products = JSON.parse(xhr.responseText);
                
                // Đảm bảo rằng sản phẩm có cấu trúc chính xác
                products = products.map(product => {
                    return {
                        id: Number(product.id),             // Chuyển đổi thành số nếu cần
                        status: Number(product.status),     // Chuyển đổi thành số nếu cần
                        title: String(product.title),       // Đảm bảo là chuỗi
                        img: String(product.img),           // Đảm bảo là chuỗi
                        category: String(product.category), // Đảm bảo là chuỗi
                        price: Number(product.price),       // Chuyển đổi thành số nếu cần
                        desc: String(product.describes) // Đảm bảo là chuỗi
                    };
                });

                // Lưu dữ liệu vào localStorage
                localStorage.setItem('products', JSON.stringify(products));
            }
        };
        xhr.send();
    }
}

// Hàm cập nhật danh sách sản phẩm từ server
function refreshProducts() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "get_products.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let products = JSON.parse(xhr.responseText);
            
            // Đảm bảo rằng sản phẩm có cấu trúc chính xác
            products = products.map(product => {
                return {
                    id: Number(product.id),
                    status: Number(product.status),
                    title: String(product.title),
                    img: String(product.img),
                    category: String(product.category),
                    price: Number(product.price),
                    desc: String(product.describes)
                };
            });

            // Cập nhật lại localStorage với dữ liệu mới
            localStorage.setItem('products', JSON.stringify(products));
        }
    };
    xhr.send();
}

// Hàm lấy danh sách sản phẩm từ localStorage
function getProducts() {
    let products = localStorage.getItem('products');
    if (products) {
        products = JSON.parse(products);
        console.log(products);
    }
}

// Tạo tài khoản admin
function createAdminAccount() {
    let accounts = localStorage.getItem("accounts");
    if (!accounts) {
        fetch('getAccounts.php')
            .then(response => response.json())
            .then(data => {
                // Đảm bảo các kiểu dữ liệu được xử lý chính xác trong JavaScript
                data = data.map(account => {
                    return {
                        fullname: account.fullname,
                        phone: account.phone,
                        password: account.password,
                        address: account.address,
                        email: account.email,
                        status: account.status, // Đã là kiểu số nguyên từ PHP
                        join: new Date(account.join_date), // Chuyển chuỗi thành đối tượng Date
                        cart: account.cart || [], // Đảm bảo cart là một mảng
                        userType: account.userType // Đã là kiểu số nguyên từ PHP
                    };
                });

                localStorage.setItem('accounts', JSON.stringify(data));
            });
    }
}

// Hàm cập nhật danh sách tài khoản admin từ server
function refreshAccounts() {
    fetch('getAccounts.php')
        .then(response => response.json())
        .then(data => {
            data = data.map(account => {
                return {
                    fullname: account.fullname,
                    phone: account.phone,
                    password: account.password,
                    address: account.address,
                    email: account.email,
                    status: account.status,
                    join: new Date(account.join_date),
                    cart: account.cart || [],
                    userType: account.userType
                };
            });

            // Cập nhật lại localStorage với dữ liệu mới
            localStorage.setItem('accounts', JSON.stringify(data));
        });
}

// Khởi tạo danh sách chi tiết đơn hàng
function createOrderDetails() {
    if (localStorage.getItem('orderDetails') === null) {
        // Sử dụng AJAX để lấy dữ liệu từ server
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "get_order_details.php", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Chuyển đổi dữ liệu JSON thành đối tượng JavaScript
                let orderDetails = JSON.parse(xhr.responseText);
                
                // Đảm bảo rằng chi tiết đơn hàng có cấu trúc chính xác
                orderDetails = orderDetails.map(detail => {
                    return {
                        madon: String(detail.madon),         // Chuyển đổi thành số nếu cần
                        id: Number(detail.product_id), // Chuyển đổi thành số nếu cần
                        note: String(detail.note), // Đảm bảo là chuỗi
                        price: Number(detail.product_price), // Chuyển đổi thành số nếu cần
                        soluong: Number(detail.soluong)      // Chuyển đổi thành số nếu cần
                    };
                });

                // Lưu dữ liệu vào localStorage
                localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
            }
        };
        xhr.send();
    }
}

// Khởi tạo danh sách đơn hàng
function createOrders() {
    if (localStorage.getItem('order') === null) {
        // Sử dụng AJAX để lấy dữ liệu từ server
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "get_orders.php", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Chuyển đổi dữ liệu JSON thành đối tượng JavaScript
                let orders = JSON.parse(xhr.responseText);
                
                // Đảm bảo rằng đơn hàng có cấu trúc chính xác
                orders = orders.map(order => {
                    return {
                        id: String(order.id),                       // Chuyển đổi thành số nếu cần
                        khachhang: String(order.khachhang),         // Đảm bảo là chuỗi
                        hinhthucgiao: String(order.hinhthucgiao),   // Đảm bảo là chuỗi
                        ngaygiaohang: String(order.ngaygiaohang),   // Đảm bảo là chuỗi
                        thoigiangiao: String(order.thoigiangiao),   // Đảm bảo là chuỗi
                        ghichu: String(order.ghichu),               // Đảm bảo là chuỗi
                        tenguoinhan: String(order.tenguoinhan),     // Đảm bảo là chuỗi
                        sdtnhan: String(order.sdtnhan),             // Đảm bảo là chuỗi
                        diachinhan: String(order.diachinhan),       // Đảm bảo là chuỗi
                        thoigiandat: String(order.thoigiandat),   // Chuyển chuỗi thành đối tượng Date
                        tongtien: Number(order.tongtien),           // Chuyển đổi thành số nếu cần
                        trangthai: Number(order.trangthai)          // Chuyển đổi thành số nếu cần
                    };
                });

                // Lưu dữ liệu vào localStorage
                localStorage.setItem('order', JSON.stringify(orders));
            }
        };
        xhr.send();
    }
}



// Gọi các hàm cập nhật khi tải lại trang
window.onload = function () {
    createProduct();
    createAdminAccount();
    createOrders();
    createOrderDetails();
    refreshProducts();  // Cập nhật sản phẩm sau khi tải lại trang
    refreshAccounts();  // Cập nhật tài khoản sau khi tải lại trang
};
