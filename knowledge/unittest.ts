// * Unit Test: Test các cái func, các logic đơn lẻ
// - Đăng kí / đăng nhập
// - Có 2 cách tiếp cận với Unit Test
//     + Viết code, rồi viết test
//     + Viết test, rồi viết code (Liệt kê ra các trường hợp thường xảy ra với cái function)
//         Khi viết tính năng đăng nhập:
//             + UC1: User đã tồn tại => báo lỗi
//             + UC2: User chưa tồn tại => báo lỗi | thông báo đăng kí
//             + UC3: Đăng nhập thất bại => ...

// => UT giúp đảm bảo các func nhỏ hoạt động đúng mục đích

// * e2e (end to end) Test: Test workflow chính của app, test tích hợp các logic ứng dụng

// Lấy danh sách sản phẩm:

// + Đăng kí => Đăng nhập => Lấy sản phẩm

// Đặt hàng:

// + Đăng kí => Đăng nhập => Đặt hàng => Ghi nhận đơn hàng => Cập nhật thông tin => Gửi thông báo / email

// - Cố gắng sử dụng những cái pure function
