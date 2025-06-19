import {
  Apple,
  Coffee,
  Leaf,
  Sprout,
  TrendingUp,
  Wheat,
  BarChart3,
  Package,
  Users,
  ShoppingCart,
  FileText,
  MessageSquare,
  Settings,
  Home,
  Tractor,
  HardHat,
  Ticket,
} from "lucide-react";

export const navItems = [
  { href: "/news", label: "Tin tức" },
  { href: "/blogs", label: "Blog nông dân" },
  { href: "/ai-diagnosis", label: "AI Chẩn đoán" },
  { href: "/products", label: "Sản phẩm" },
  { href: "/support", label: "Hỗ trợ" },
  { href: "#", label: "Liên hệ" },
];

export const productAdmin: ApiResponse<Product> = {
  items: [
    {
      id: 1,
      name: "Phân bón hữu cơ NPK 16-16-8",
      description:
        "Phân bón hữu cơ NPK chất lượng cao, giúp cây phát triển mạnh mẽ và tăng năng suất",
      price: 250000,
      categoryId: 1,
      stock: 150,
      rating: 4.5,
      reviews: 23,
      imageUrl: "/placeholder.svg?height=60&width=60",
      isActive: true,
      sku: "NPK-001",
      discountPrice: 225000,
      createdAt: "2024-01-15T08:00:00Z",
      updatedAt: "2024-01-20T10:30:00Z",
      category: {
        id: 1,
        name: "Phân bón",
        description: "Các loại phân bón cho cây trồng",
        slug: "phan-bon",
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
      },
    },
    {
      id: 2,
      name: "Thuốc trừ sâu sinh học BT",
      description:
        "Thuốc trừ sâu sinh học an toàn, không độc hại cho môi trường và con người",
      price: 180000,
      categoryId: 2,
      stock: 75,
      rating: 4.2,
      reviews: 15,
      imageUrl: "/placeholder.svg?height=60&width=60",
      isActive: true,
      sku: "BT-002",
      discountPrice: 162000,
      createdAt: "2024-01-10T09:15:00Z",
      updatedAt: "2024-01-18T14:20:00Z",
      category: {
        id: 2,
        name: "Thuốc BVTV",
        description: "Thuốc bảo vệ thực vật",
        slug: "thuoc-bvtv",
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
      },
    },
    {
      id: 3,
      name: "Giống lúa ST25 cao cấp",
      description:
        "Giống lúa ST25 chất lượng cao, năng suất ổn định, thích ứng tốt với khí hậu",
      price: 45000,
      categoryId: 3,
      stock: 0,
      rating: 4.8,
      reviews: 42,
      imageUrl: "/placeholder.svg?height=60&width=60",
      isActive: false,
      sku: "ST25-003",
      discountPrice: 40500,
      createdAt: "2024-01-05T07:30:00Z",
      updatedAt: "2024-01-22T16:45:00Z",
      category: {
        id: 3,
        name: "Giống cây trồng",
        description: "Các loại giống cây trồng chất lượng",
        slug: "giong-cay-trong",
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
      },
    },
    {
      id: 4,
      name: "Máy phun thuốc mini",
      description:
        "Máy phun thuốc cầm tay tiện lợi, dễ sử dụng cho vườn nhỏ và gia đình",
      price: 850000,
      categoryId: 4,
      stock: 25,
      rating: 4.3,
      reviews: 8,
      imageUrl: "/placeholder.svg?height=60&width=60",
      isActive: true,
      sku: "SPRAY-004",
      discountPrice: 765000,
      createdAt: "2024-01-12T11:00:00Z",
      updatedAt: "2024-01-19T13:15:00Z",
      category: {
        id: 4,
        name: "Dụng cụ nông nghiệp",
        description: "Các loại dụng cụ hỗ trợ nông nghiệp",
        slug: "dung-cu-nong-nghiep",
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
      },
    },
    {
      id: 5,
      name: "Phân DAP 18-46-0",
      description:
        "Phân DAP giàu phospho, thích hợp cho giai đoạn ra hoa và phát triển rễ",
      price: 320000,
      categoryId: 1,
      stock: 200,
      rating: 4.1,
      reviews: 31,
      imageUrl: "/placeholder.svg?height=60&width=60",
      isActive: true,
      sku: "DAP-005",
      discountPrice: 320000,
      createdAt: "2024-01-08T14:30:00Z",
      updatedAt: "2024-01-25T09:45:00Z",
      category: {
        id: 1,
        name: "Phân bón",
        description: "Các loại phân bón cho cây trồng",
        slug: "phan-bon",
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
      },
    },
    {
      id: 6,
      name: "Thuốc diệt cỏ Glyphosate",
      description:
        "Thuốc diệt cỏ hiệu quả cao, phù hợp nhiều loại cỏ dại và cây không mong muốn",
      price: 95000,
      categoryId: 2,
      stock: 120,
      rating: 3.9,
      reviews: 18,
      imageUrl: "/placeholder.svg?height=60&width=60",
      isActive: true,
      sku: "GLY-006",
      discountPrice: 85500,
      createdAt: "2024-01-03T16:20:00Z",
      updatedAt: "2024-01-21T11:10:00Z",
      category: {
        id: 2,
        name: "Thuốc BVTV",
        description: "Thuốc bảo vệ thực vật",
        slug: "thuoc-bvtv",
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
      },
    },
    {
      id: 7,
      name: "Giống ngô lai F1",
      description:
        "Giống ngô lai F1 năng suất cao, chống chịu tốt với sâu bệnh và thời tiết",
      price: 65000,
      categoryId: 3,
      stock: 80,
      rating: 4.6,
      reviews: 27,
      imageUrl: "/placeholder.svg?height=60&width=60",
      isActive: true,
      sku: "CORN-007",
      discountPrice: 58500,
      createdAt: "2024-01-07T10:15:00Z",
      updatedAt: "2024-01-23T15:30:00Z",
      category: {
        id: 3,
        name: "Giống cây trồng",
        description: "Các loại giống cây trồng chất lượng",
        slug: "giong-cay-trong",
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
      },
    },
    {
      id: 8,
      name: "Máy cắt cỏ cầm tay",
      description:
        "Máy cắt cỏ cầm tay động cơ 2 thì, công suất mạnh, tiết kiệm nhiên liệu",
      price: 1250000,
      categoryId: 5,
      stock: 15,
      rating: 4.4,
      reviews: 12,
      imageUrl: "/placeholder.svg?height=60&width=60",
      isActive: true,
      sku: "MOWER-008",
      discountPrice: 1125000,
      createdAt: "2024-01-11T13:45:00Z",
      updatedAt: "2024-01-24T08:20:00Z",
      category: {
        id: 5,
        name: "Máy móc",
        description: "Máy móc nông nghiệp",
        slug: "may-moc",
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
      },
    },
    {
      id: 9,
      name: "Xẻng cuốc đa năng",
      description:
        "Xẻng cuốc đa năng, chất liệu thép không gỉ, bền bỉ và sắc bén",
      price: 125000,
      categoryId: 4,
      stock: 60,
      rating: 4.0,
      reviews: 9,
      imageUrl: "/placeholder.svg?height=60&width=60",
      isActive: true,
      sku: "TOOL-009",
      discountPrice: 125000,
      createdAt: "2024-01-09T12:00:00Z",
      updatedAt: "2024-01-26T14:15:00Z",
      category: {
        id: 4,
        name: "Dụng cụ nông nghiệp",
        description: "Các loại dụng cụ hỗ trợ nông nghiệp",
        slug: "dung-cu-nong-nghiep",
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
      },
    },
    {
      id: 10,
      name: "Phân Urea 46%",
      description:
        "Phân đạm Urea hàm lượng nitơ cao 46%, thúc đẩy sinh trưởng cây trồng",
      price: 280000,
      categoryId: 1,
      stock: 300,
      rating: 4.3,
      reviews: 45,
      imageUrl: "/placeholder.svg?height=60&width=60",
      isActive: true,
      sku: "UREA-010",
      discountPrice: 266000,
      createdAt: "2024-01-06T09:30:00Z",
      updatedAt: "2024-01-27T16:45:00Z",
      category: {
        id: 1,
        name: "Phân bón",
        description: "Các loại phân bón cho cây trồng",
        slug: "phan-bon",
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
      },
    },
    {
      id: 11,
      name: "Thuốc trừ nấm Mancozeb",
      description:
        "Thuốc trừ nấm phổ rộng, phòng trị nhiều bệnh nấm trên cây trồng",
      price: 75000,
      categoryId: 2,
      stock: 0,
      rating: 3.8,
      reviews: 14,
      imageUrl: "/placeholder.svg?height=60&width=60",
      isActive: true,
      sku: "MANCO-011",
      discountPrice: 67500,
      createdAt: "2024-01-04T11:20:00Z",
      updatedAt: "2024-01-28T10:30:00Z",
      category: {
        id: 2,
        name: "Thuốc BVTV",
        description: "Thuốc bảo vệ thực vật",
        slug: "thuoc-bvtv",
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
      },
    },
    {
      id: 12,
      name: "Giống cà chua F1",
      description:
        "Giống cà chua lai F1 chịu nhiệt, năng suất cao, quả to và ngon",
      price: 35000,
      categoryId: 3,
      stock: 45,
      rating: 4.7,
      reviews: 33,
      imageUrl: "/placeholder.svg?height=60&width=60",
      isActive: true,
      sku: "TOMATO-012",
      discountPrice: 31500,
      createdAt: "2024-01-13T15:10:00Z",
      updatedAt: "2024-01-29T12:25:00Z",
      category: {
        id: 3,
        name: "Giống cây trồng",
        description: "Các loại giống cây trồng chất lượng",
        slug: "giong-cay-trong",
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
      },
    },
    {
      id: 13,
      name: "Máy bơm nước mini",
      description:
        "Máy bơm nước mini cho tưới tiêu vườn nhỏ, tiết kiệm điện năng",
      price: 650000,
      categoryId: 5,
      stock: 8,
      rating: 4.2,
      reviews: 6,
      imageUrl: "/placeholder.svg?height=60&width=60",
      isActive: true,
      sku: "PUMP-013",
      discountPrice: 585000,
      createdAt: "2024-01-14T08:45:00Z",
      updatedAt: "2024-01-30T09:15:00Z",
      category: {
        id: 5,
        name: "Máy móc",
        description: "Máy móc nông nghiệp",
        slug: "may-moc",
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
      },
    },
    {
      id: 14,
      name: "Bình tưới cây tự động",
      description:
        "Bình tưới cây tự động, tiết kiệm nước và thời gian chăm sóc cây trồng",
      price: 450000,
      categoryId: 4,
      stock: 35,
      rating: 4.1,
      reviews: 11,
      imageUrl: "/placeholder.svg?height=60&width=60",
      isActive: false,
      sku: "AUTO-014",
      discountPrice: 405000,
      createdAt: "2024-01-16T14:30:00Z",
      updatedAt: "2024-01-31T11:40:00Z",
      category: {
        id: 4,
        name: "Dụng cụ nông nghiệp",
        description: "Các loại dụng cụ hỗ trợ nông nghiệp",
        slug: "dung-cu-nong-nghiep",
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
      },
    },
  ],
  totalCount: 14,
  pageNumber: 1,
  pageSize: 20,
  totalPages: 1,
  hasPreviousPage: false,
  hasNextPage: false,
};

export const sidebarItems = [
  {
    title: "Tổng quan",
    items: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: Home,
      },
      {
        title: "Phân tích",
        url: "/admin/analytics",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Quản lý",
    items: [
      {
        title: "Sản phẩm",
        url: "/admin/product_management",
        icon: Package,
      },
      {
        title: "Người dùng",
        url: "/admin/users",
        icon: Users,
      },
      {
        title: "Nông dân",
        url: "/admin/farmers",
        icon: Tractor,
      },
      {
        title: "Kỹ sư",
        url: "/admin/engineers",
        icon: HardHat,
      },
      {
        title: "Đơn hàng",
        url: "/admin/orders",
        icon: ShoppingCart,
      },
      {
        title: "Ticket",
        url: "/admin/ticket",
        icon: Ticket,
      },
      {
        title: "Blog",
        url: "/admin/blogs",
        icon: FileText,
      },
      {
        title: "Hỗ trợ",
        url: "/admin/support",
        icon: MessageSquare,
      },
    ],
  },
  {
    title: "Hệ thống",
    items: [
      {
        title: "Cài đặt",
        url: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

export const blogCategories = [
  { name: "Tất cả", value: "all", icon: Leaf },
  { name: "Xu hướng", value: "Xu hướng", icon: TrendingUp },
  { name: "Cây lương thực", value: "Cây lương thực", icon: Wheat },
  { name: "Rau màu", value: "Rau màu", icon: Sprout },
  { name: "Cây ăn quả", value: "Cây ăn quả", icon: Apple },
  { name: "Cây công nghiệp", value: "Cây công nghiệp", icon: Coffee },
  { name: "Kỹ thuật", value: "Kỹ thuật", icon: Leaf },
  { name: "Mô hình", value: "Mô hình", icon: Leaf },
];

export const plantDiseases: Record<
  string,
  Record<
    string,
    {
      symptoms: string[];
      description: string;
      treatment: string;
    }
  >
> = {
  Tomato: {
    "Late blight": {
      symptoms: [
        "Các đốm nước màu nâu sẫm trên lá và thân",
        "Lá và quả có thể bị thối và chuyển màu nâu",
        "Mốc trắng có thể xuất hiện ở mặt dưới của lá",
      ],
      description:
        "Bệnh mốc sương (Late blight) do Phytophthora infestans gây ra, tấn công lá, thân và quả cà chua trong điều kiện ẩm ướt.",
      treatment:
        "Loại bỏ cây bệnh, dùng thuốc trừ nấm chứa đồng/mancozeb, không trồng gần khoai tây, đảm bảo thông thoáng.",
    },
    "Early blight": {
      symptoms: [
        "Đốm tròn màu nâu trên lá với các vòng đồng tâm",
        "Lá bị vàng xung quanh đốm",
        "Quả có thể bị thối với vết lõm tối màu",
      ],
      description:
        "Early blight do nấm Alternaria solani gây ra, ảnh hưởng lá, thân và quả, thường trong mùa ẩm.",
      treatment:
        "Cắt lá bệnh, dùng thuốc trừ nấm, luân canh, bón phân cân đối.",
    },
    "Septoria leafspot": {
      symptoms: [
        "Các đốm nhỏ hình tròn, viền sẫm trên lá",
        "Lá vàng và rụng sớm",
        "Lá khô và xoăn quanh đốm",
      ],
      description:
        "Septoria leaf spot do nấm Septoria lycopersici gây ra, lan rộng nhanh trong điều kiện ẩm thấp.",
      treatment:
        "Loại bỏ lá nhiễm, tưới gốc, thông thoáng, dùng thuốc trừ nấm, luân canh.",
    },
    "Tomato Yellow Leaf Curl Virus": {
      symptoms: [
        "Lá xoăn, vàng",
        "Cây còi cọc, phát triển chậm",
        "Giảm năng suất mạnh",
      ],
      description:
        "Virus TYLCV lây qua bọ phấn trắng, khiến lá méo và vàng, ảnh hưởng năng suất.",
      treatment:
        "Phòng bọ phấn trắng, sử dụng bẫy vàng hoặc thuốc BVTV, dùng giống kháng, tiêu hủy cây bệnh.",
    },
    "Bacterial spot": {
      symptoms: [
        "Đốm nhỏ màu sẫm trên lá, thân, quả",
        "Đốm ướt, lan rộng",
        "Quả sần sùi, giảm giá trị",
      ],
      description:
        "Xanthomonas campestris gây đốm vi khuẩn, lây lan qua nước, gió và dụng cụ.",
      treatment:
        "Tránh tưới lá, dùng thuốc chứa đồng, vệ sinh nông cụ, giống kháng.",
    },
    "Tomato mosaic virus": {
      symptoms: [
        "Lá có vân đốm xanh đậm nhạt xen kẽ, méo",
        "Cây còi cọc",
        "Quả nhỏ, méo",
      ],
      description:
        "Virus TMV lây qua hạt giống, dụng cụ, tiếp xúc cơ học; cây đã nhiễm không cứu được.",
      treatment:
        "Tiêu hủy cây bệnh, vệ sinh dụng cụ, dùng giống kháng, không hút thuốc khi chăm sóc.",
    },
    "Leaf Mold": {
      symptoms: [
        "Đốm vàng trên mặt lá trên",
        "Mặt dưới có lớp mốc xanh ô-liu",
        "Lá rụng, cây yếu",
      ],
      description:
        "Fulvia fulva gây bệnh mốc lá, phổ biến ở nhà kính và nơi ẩm ướt.",
      treatment:
        "Đảm bảo thông gió, cắt lá bệnh, dùng thuốc trừ nấm, luân canh.",
    },
    "Target Spot": {
      symptoms: [
        "Đốm nâu tròn trên lá, thân, quả",
        "Trung tâm lõm như hình mắt",
        "Cây suy yếu nhanh",
      ],
      description:
        "Do nấm Corynespora cassiicola, phát triển mạnh trong điều kiện nóng ẩm.",
      treatment:
        "Tiêu hủy phần bệnh, dùng thuốc trừ nấm, thông thoáng, giảm độ ẩm.",
    },
    "Spider mites Two-spotted spider mite": {
      symptoms: [
        "Lá vàng nhạt đến đồng",
        "Mạng tơ nhỏ dưới lá",
        "Cây còi, giảm năng suất",
      ],
      description: "Nhện đỏ hai chấm hút nhựa, làm lá đổi màu và cây yếu.",
      treatment:
        "Rửa nước mạnh, dùng dầu neem hoặc thuốc trừ nhện, duy trì độ ẩm cao.",
    },
  },
  Grape: {
    "Leaf blight (Isariopsis Leaf Spot)": {
      symptoms: [
        "Đốm nâu đen trên lá",
        "Lá vàng, khô và rụng",
        "Đốm có viền vàng",
      ],
      description:
        "Leaf blight do nấm Isariopsis gây ra, ghi nhận trên lá nho khi ẩm ướt.",
      treatment:
        "Loại bỏ lá nhiễm, thông thoáng vườn, thuốc trừ nấm, luân canh.",
    },
    "Black rot": {
      symptoms: ["Đốm nâu/đen trên lá và quả, quả co lại", "Quả khô cứng, đen"],
      description: "Phoma viticola gây black rot, phá huỷ quả nho và lá.",
      treatment: "Cắt bỏ quả/ lá bệnh, thông thoáng, thuốc trừ nấm.",
    },
    "Esca (Black Measles)": {
      symptoms: ["Vết đốm đen trên cuống quả", "Quả nổ, rụng, lá bị tàn"],
      description:
        "Esca là bệnh do nhiều nấm (tổn thương gỗ), gây black measles trên quả.",
      treatment: "Loại bỏ phần gỗ bệnh, vệ sinh vườn, thuốc trừ nấm gỗ.",
    },
  },
  Orange: {
    "Haunglongbing (Citrus greening)": {
      symptoms: ["Lá vàng không đồng đều (zebra)", "Quả xanh, thơm kém"],
      description:
        "HLB do vi khuẩn Candidatus Liberibacter spp. và lây truyền bởi bọ xít khế.",
      treatment: "Tiêu hủy cây bệnh, kiểm soát bọ xít, trồng giống kháng.",
    },
  },
  Squash: {
    "Powdery mildew": {
      symptoms: ["Lớp bột trắng trên mặt lá", "Lá vàng, khô"],
      description:
        "Bột trắng do nấm khô lên bề mặt lá, phát triển nhanh khi khô ấm.",
      treatment:
        "Loại bỏ lá bệnh, giữ thông thoáng, dùng thuốc trừ nấm chứa sulfur.",
    },
  },
  Potato: {
    "Late blight": {
      symptoms: ["Đốm nước trên lá/tubers, mốc trắng", "Thối nhũn"],
      description:
        "Phytophthora infestans gây Late blight, phá hủy khoai tây lá và củ.",
      treatment: "Cắt bỏ cây bệnh, thuốc trừ nấm, không để ẩm đọng.",
    },
    "Early blight": {
      symptoms: ["Đốm tròn nâu với vòng đồng tâm trên lá", "Lá vàng rụng"],
      description:
        "Alternaria solani gây Early blight trên khoai tây và cà chua.",
      treatment: "Cắt bỏ lá bệnh, thuốc trừ nấm, luân canh.",
    },
  },
  Corn: {
    "Northern Leaf Blight": {
      symptoms: ["Đốm dài nâu xám trên lá", "Lá khô lớn"],
      description:
        "Setosphaeria turcica gây Northern leaf blight khi khí hậu mát ẩm.",
      treatment: "Trồng giống kháng, luân canh, thuốc trừ nấm.",
    },
    "Cercospora Gray leafspot": {
      symptoms: ["Đốm hình chữ nhật/bầu dục màu nâu xám", "Có viền viền vàng"],
      description:
        "Cercospora zeae-maydis gây gray leaf spot, gặp trong điều kiện nhiệt ẩm.",
      treatment: "Giống kháng, luân canh, thuốc trừ nấm.",
    },
    "Common rust": {
      symptoms: ["Các nốt gỉ đỏ/nâu lồi trên lá", "Lá vàng khi nặng"],
      description:
        "Puccinia sorghi gây rối dãy gỉ phổ biến trong điều kiện ẩm nóng.",
      treatment: "Giống kháng, tháo ẩm, thuốc trừ nấm.",
    },
  },
  Apple: {
    "Apple scab": {
      symptoms: ["Đốm sần nâu trên lá", "Lá vàng rụng"],
      description:
        "Venturia inaequalis gây apple scab, ảnh hưởng đến lá và quả.",
      treatment: "Cắt bỏ lá bệnh, đảm bảo thông thoáng, thuốc trừ nấm.",
    },
    Blackrot: {
      symptoms: ["Vết nâu trên quả và lá", "Quả đen sũng, thối"],
      description: "Bệnh do nấm Botryosphaeria obtusa, tấn công quả và cành.",
      treatment: "Loại bỏ quả/ lá bệnh, thông thoáng, thuốc trừ nấm.",
    },
    Cedar_applerust: {
      symptoms: ["Đốm cam trên lá quả", "Đĩa đốm có gai mảnh"],
      description:
        "Gymnosporangium juniperi-virginianae gây rust qua hai chủng cây.",
      treatment: "Loại bỏ cây bách cạnh gần, thuốc trừ nấm khi phát hiện.",
    },
  },
  Peach: {
    Bacterial_spot: {
      symptoms: ["Đốm tối trên lá và quả", "Lá khô và rụng"],
      description:
        "Xanthomonas arboricola pv. pruni gây đốm vi khuẩn trên đào.",
      treatment: "Vệ sinh, dùng thuốc đồng, giống kháng.",
    },
  },
  Strawberry: {
    Leaf_scorch: {
      symptoms: ["Lá khô và cháy xém mép", "Đốm tím đỏ xung quanh"],
      description:
        "Bệnh scorch do nấm Mycosphaerella fragariae làm lá cháy mép, rụng.",
      treatment: "Loại bỏ lá bệnh, thông thoáng, thuốc trừ nấm.",
    },
  },
  Cherry: {
    Powderymildew: {
      symptoms: [
        "Lớp bột trắng trên bề mặt lá và quả",
        "Lá khô, cuống bị biến dạng",
      ],
      description: "Powdery mildew do nấm Erysiphe gây ra trên cherry.",
      treatment: "Cắt bỏ lá bệnh, dùng thuốc trừ nấm chứa sulfur.",
    },
  },
  Raspberry: {
    /* không có bệnh trong danh sách, chỉ healthy -> bỏ */
  },
  Blueberry: {
    /* chỉ healthy */
  },
  Soybean: {
    /* chỉ healthy */
  },
  Pepper_bell: {
    Bacterial_spot: {
      symptoms: ["Đốm nước nhỏ trên lá/quả", "Quả mất hình thức"],
      description:
        "Xanthomonas euvesicatoria gây bệnh đốm vi khuẩn ở ớt chuông.",
      treatment: "Vệ sinh ruộng, thuốc đồng, giống kháng.",
    },
  },
};

export const mockPosts: BlogPost[] = [
  {
    id: 1,
    title: "Cách nhận biết và phòng trị bệnh đạo ôn lúa",
    slug: "cach-nhan-biet-va-phong-tri-benh-dao-on-lua",
    status: "published",
    categoryName: "Bệnh cây trồng",
    authorName: "Nguyễn Văn An",
    createdAt: "2025-05-28T09:09:04.4115059",
    publishedAt: "2025-06-02T09:09:04.4115059",
    viewCount: 1250,
  },
  {
    id: 2,
    title: "Kỹ thuật trồng lúa bền vững theo phương pháp hữu cơ",
    slug: "ky-thuat-trong-lua-ben-vung-theo-phuong-phap-huu-co",
    status: "published",
    categoryName: "Kỹ thuật canh tác",
    authorName: "Trần Thị Bình",
    createdAt: "2025-05-25T10:15:30.123456",
    publishedAt: "2025-05-26T08:00:00.000000",
    viewCount: 890,
  },
  {
    id: 3,
    title: "Ứng dụng IoT trong nông nghiệp thông minh",
    slug: "ung-dung-iot-trong-nong-nghiep-thong-minh",
    status: "draft",
    categoryName: "Công nghệ",
    authorName: "Lê Minh Cường",
    createdAt: "2025-06-10T14:30:15.789012",
    publishedAt: null,
    viewCount: 0,
  },
  {
    id: 4,
    title: "Phương pháp tưới tiêu hiệu quả cho cây trồng",
    slug: "phuong-phap-tuoi-tieu-hieu-qua-cho-cay-trong",
    status: "published",
    categoryName: "Kỹ thuật canh tác",
    authorName: "Phạm Văn Đức",
    createdAt: "2025-06-05T16:45:22.345678",
    publishedAt: "2025-06-06T07:30:00.000000",
    viewCount: 567,
  },
  {
    id: 5,
    title: "Cách chọn giống lúa phù hợp với từng vùng miền",
    slug: "cach-chon-giong-lua-phu-hop-voi-tung-vung-mien",
    status: "archived",
    categoryName: "Giống cây trồng",
    authorName: "Hoàng Thị Em",
    createdAt: "2025-04-20T11:20:45.567890",
    publishedAt: "2025-04-22T09:15:00.000000",
    viewCount: 2340,
  },
];
