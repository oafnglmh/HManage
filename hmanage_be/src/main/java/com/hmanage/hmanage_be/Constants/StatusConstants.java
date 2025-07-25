package com.hmanage.hmanage_be.Constants;

public class StatusConstants {
    /** Trạng thái đang hoạt động (hiển thị, sử dụng được) */
    public static final Integer ACTIVE = 1;

    /** Trạng thái không hoạt động (ẩn, khóa, tạm dừng sử dụng) */
    public static final Integer INACTIVE = 0;

    /** Trạng thái đã xóa mềm (không hiển thị nhưng vẫn còn trong database) */
    public static final Integer DELETED = -1;

    /** Trạng thái đang chờ xử lý (đang chờ duyệt, chờ xác nhận, ...) */
    public static final Integer PENDING = 2;

    /** Trạng thái đã từ chối, không được duyệt hoặc không hợp lệ */
    public static final Integer REJECTED = 3;

    /** Trạng thái đã hoàn tất xử lý hoặc đã duyệt */
    public static final Integer COMPLETED = 4;

    /** Trạng thái đang xử lý (ví dụ: đơn hàng đang giao, tài liệu đang xử lý) */
    public static final Integer PROCESSING = 5;

    /** Trạng thái bị hủy (do người dùng hoặc hệ thống) */
    public static final Integer CANCELED = 6;

    /** Trạng thái bài làm trắc nghiệm */
    public static final Integer START = 10;

    /** Trạng thái đăng bài mạng xã hội */
    public static final Integer SOCIAL = 20;
}
