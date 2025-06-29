import {
  Apple,
  Coffee,
  Leaf,
  Sprout,
  TrendingUp,
  Wheat,
  BarChart3,
  Package,
  ShoppingCart,
  FileText,
  MessageSquare,
  Settings,
  Home,
  Tractor,
  HardHat,
  Ticket,
  NewspaperIcon,
} from "lucide-react";

export const navItems = [
  { href: "/news", label: "Tin tức" },
  { href: "/blogs", label: "Blog nông dân" },
  { href: "/ai-diagnosis", label: "AI Chẩn đoán" },
  { href: "/products", label: "Sản phẩm" },
  { href: "/support", label: "Hỗ trợ" },
  { href: "#", label: "Liên hệ" },
];

export const adminSidebarItems = [
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

export const engineerSidebarItems = [
  {
    title: "Quản lý",
    items: [
      {
        title: "Tin tức",
        url: "/engineer/news",
        icon: NewspaperIcon,
      },
      {
        title: "Ticket",
        url: "/engineer/tickets",
        icon: Ticket,
      },
      {
        title: "Blog",
        url: "/engineer/blogs",
        icon: FileText,
      },
    ],
  },
  {
    title: "Hệ thống",
    items: [
      {
        title: "Cài đặt",
        url: "/engineer/settings",
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
