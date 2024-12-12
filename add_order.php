<?php
$servername = "localhost"; // Địa chỉ máy chủ MySQL
$username = "root"; // Tên đăng nhập MySQL
$password = ""; // Mật khẩu MySQL
$dbname = "websach"; // Tên cơ sở dữ liệu

// Tạo kết nối đến cơ sở dữ liệu
$conn = new mysqli($servername, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Kết nối cơ sở dữ liệu thất bại!"]));
}

// Lấy dữ liệu từ yêu cầu POST
$order = json_decode($_POST['order'], true);
$orderDetails = json_decode($_POST['orderDetails'], true);

// Chuẩn bị câu lệnh SQL để thêm đơn hàng vào bảng 'order'
$sqlOrder = "INSERT INTO `order` (id, khachhang, hinhthucgiao, ngaygiaohang, thoigiangiao, ghichu, tenguoinhan, sdtnhan, diachinhan, thoigiandat, tongtien, trangthai) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmtOrder = $conn->prepare($sqlOrder);
$stmtOrder->bind_param("ssssssssssii", $order['id'], $order['khachhang'], $order['hinhthucgiao'], $order['ngaygiaohang'], $order['thoigiangiao'], $order['ghichu'], $order['tenguoinhan'], $order['sdtnhan'], $order['diachinhan'], $order['thoigiandat'], $order['tongtien'], $order['trangthai']);

// Xóa
$sql = "DELETE FROM `orderDetails`;";
$conn->query($sql);


// Thực thi câu lệnh SQL để thêm đơn hàng
if ($stmtOrder->execute()) {
    // Chuẩn bị câu lệnh SQL để thêm chi tiết đơn hàng vào bảng 'orderDetails'
    $sqlOrderDetails = "INSERT INTO orderDetails (madon, product_id, note, product_price, soluong) VALUES (?, ?, ?, ?, ?)";
    $stmtOrderDetails = $conn->prepare($sqlOrderDetails);
    
    foreach ($orderDetails as $detail) {
        $stmtOrderDetails->bind_param("sisii", $detail['madon'], $detail['id'], $detail['note'], $detail['price'], $detail['soluong']);
        $stmtOrderDetails->execute();
    }
}

$stmtOrder->close();
$stmtOrderDetails->close();
$conn->close();
?>
