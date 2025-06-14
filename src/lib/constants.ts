import {
  AlertTriangle,
  Apple,
  BookOpen,
  Briefcase,
  Calendar,
  Coffee,
  Globe,
  Leaf,
  Sprout,
  TrendingUp,
  Wheat,
} from "lucide-react";

export const navItems = [
  { href: "/news", label: "Tin tức" },
  { href: "/blogs", label: "Blog nông dân" },
  { href: "/ai-diagnosis", label: "AI Chẩn đoán" },
  { href: "/products", label: "Sản phẩm" },
  { href: "/support", label: "Hỗ trợ" },
  { href: "#", label: "Liên hệ" },
];

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Chính phủ công bố gói hỗ trợ 10.000 tỷ đồng cho nông nghiệp 2024",
    excerpt:
      "Thủ tướng Chính phủ vừa ký quyết định phê duyệt gói hỗ trợ tín dụng ưu đãi 10.000 tỷ đồng nhằm thúc đẩy phát triển nông nghiệp bền vững.",
    content: "",
    author: "Ban Biên tập",
    publishedAt: "2024-01-20",
    category: "Chính sách",
    image:
      "https://s3zs55b05y.ufs.sh/f/mwEfFzLmOdgcrAZxxbzaFsz5juXgEZKcWkbvBifGpJ1R4YyL",
    views: 5420,
    featured: true,
    urgent: true,
    tags: ["Chính sách", "Hỗ trợ", "Tín dụng", "Nông nghiệp"],
    source: "Bộ Nông nghiệp và Phát triển Nông thôn",
  },
  {
    id: "2",
    title: "Cảnh báo dịch bệnh cúm gia cầm H5N1 tại các tỉnh phía Bắc",
    excerpt:
      "Cục Thú y khuyến cáo các tỉnh phía Bắc tăng cường biện pháp phòng chống dịch bệnh cúm gia cầm H5N1 sau khi phát hiện ổ dịch mới.",
    content: "",
    author: "Phòng Tin tức",
    publishedAt: "2024-01-18",
    category: "Cảnh báo",
    image:
      "https://s3zs55b05y.ufs.sh/f/mwEfFzLmOdgcjISm6WoVzUG9Inu86sNw41qlWfBKgD2RyOcC",
    views: 3210,
    featured: true,
    urgent: true,
    tags: ["Dịch bệnh", "Gia cầm", "Cảnh báo", "Phòng chống"],
    source: "Cục Thú y",
  },
  {
    id: "3",
    title: "Giá lúa gạo xuất khẩu tăng mạnh trong quý I/2024",
    excerpt:
      "Theo báo cáo của Hiệp hội Lương thực Việt Nam, giá lúa gạo xuất khẩu đã tăng 15% so với cùng kỳ năm trước nhờ nhu cầu thế giới tăng cao.",
    content: "",
    author: "Bộ phận Thị trường",
    publishedAt: "2024-01-16",
    category: "Thị trường",
    image:
      "https://s3zs55b05y.ufs.sh/f/mwEfFzLmOdgc10jvNuFy1sSQilrF4BMAD8wR5Go0PqdLJgUc",
    views: 2890,
    featured: false,
    urgent: false,
    tags: ["Xuất khẩu", "Lúa gạo", "Giá cả", "Thị trường"],
    source: "Hiệp hội Lương thực Việt Nam",
  },
  {
    id: "4",
    title: "Nghiên cứu mới: Giống lúa ST25 kháng hạn được công nhận quốc tế",
    excerpt:
      "Viện Cây lương thực và Cây thực phẩm vừa công bố thành công trong việc phát triển giống lúa ST25 có khả năng kháng hạn cao.",
    content: "",
    author: "Ban Khoa học",
    publishedAt: "2024-01-14",
    category: "Nghiên cứu",
    image:
      "https://s3zs55b05y.ufs.sh/f/mwEfFzLmOdgchwwcKsqXq6bTnydlB1NAcLUoWHFkrEsiwfgD",
    views: 1750,
    featured: false,
    urgent: false,
    tags: ["Nghiên cứu", "Giống lúa", "Kháng hạn", "ST25"],
    source: "Viện Cây lương thực và Cây thực phẩm",
  },
  {
    id: "5",
    title: "Dự báo thời tiết: Đợt rét đậm kéo dài đến cuối tháng 1",
    excerpt:
      "Trung tâm Dự báo Khí tượng Thủy văn Quốc gia cảnh báo đợt rét đậm, rét hại sẽ kéo dài đến cuối tháng 1, ảnh hưởng đến sản xuất nông nghiệp.",
    content: "",
    author: "Phòng Thời tiết",
    publishedAt: "2024-01-12",
    category: "Thời tiết",
    image:
      "https://s3zs55b05y.ufs.sh/f/mwEfFzLmOdgc8bQktBaK9ejhSULYQpfo2CPixnaFrgDcbG8m",
    views: 4320,
    featured: true,
    urgent: false,
    tags: ["Thời tiết", "Rét đậm", "Dự báo", "Nông nghiệp"],
    source: "Trung tâm Dự báo Khí tượng Thủy văn Quốc gia",
  },
  {
    id: "6",
    title: "Hội nghị quốc tế về nông nghiệp bền vững sẽ diễn ra tại Hà Nội",
    excerpt:
      "Hội nghị quốc tế về nông nghiệp bền vững và an ninh lương thực sẽ được tổ chức tại Hà Nội từ ngày 15-17/2/2024.",
    content: "",
    author: "Ban Tổ chức",
    publishedAt: "2024-01-10",
    category: "Sự kiện",
    image:
      "https://s3zs55b05y.ufs.sh/f/mwEfFzLmOdgcvExZneY13IXcKmhk2N8YwtDM4g7UbG0TsujS",
    views: 1420,
    featured: false,
    urgent: false,
    tags: ["Hội nghị", "Quốc tế", "Bền vững", "An ninh lương thực"],
    source: "Bộ Nông nghiệp và Phát triển Nông thôn",
  },
  {
    id: "7",
    title: "Chương trình đào tạo nông dân ứng dụng công nghệ 4.0",
    excerpt:
      "Bộ Nông nghiệp và Phát triển Nông thôn phối hợp với các trường đại học triển khai chương trình đào tạo nông dân về công nghệ 4.0.",
    content: "",
    author: "Phòng Đào tạo",
    publishedAt: "2024-01-08",
    category: "Đào tạo",
    image:
      "https://s3zs55b05y.ufs.sh/f/mwEfFzLmOdgczWZclihOPkB29lioZgw36NU4vGfY8LHJnMTV",
    views: 980,
    featured: false,
    urgent: false,
    tags: ["Đào tạo", "Công nghệ 4.0", "Nông dân", "Ứng dụng"],
    source: "Bộ Nông nghiệp và Phát triển Nông thôn",
  },
  {
    id: "8",
    title: "Thị trường nông sản hữu cơ Việt Nam tăng trưởng 25% năm 2023",
    excerpt:
      "Báo cáo thống kê cho thấy thị trường nông sản hữu cơ Việt Nam đạt mức tăng trưởng 25% trong năm 2023, vượt xa kỳ vọng.",
    content: "",
    author: "Phòng Thống kê",
    publishedAt: "2024-01-05",
    category: "Thị trường",
    image:
      "https://s3zs55b05y.ufs.sh/f/mwEfFzLmOdgcR8CVSvbzBD9Epy4t7HlIWqG5CbegSwQZk3Fs",
    views: 2150,
    featured: false,
    urgent: false,
    tags: ["Hữu cơ", "Thống kê", "Tăng trưởng", "Thị trường"],
    source: "Tổng cục Thống kê",
  },
];

export const newsCategories = [
  { name: "Tất cả", value: "all", icon: Globe },
  { name: "Chính sách", value: "Chính sách", icon: Briefcase },
  { name: "Thị trường", value: "Thị trường", icon: TrendingUp },
  { name: "Cảnh báo", value: "Cảnh báo", icon: AlertTriangle },
  { name: "Nghiên cứu", value: "Nghiên cứu", icon: BookOpen },
  { name: "Thời tiết", value: "Thời tiết", icon: Globe },
  { name: "Sự kiện", value: "Sự kiện", icon: Calendar },
  { name: "Đào tạo", value: "Đào tạo", icon: BookOpen },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Xu hướng nông nghiệp thông minh 2024: IoT và AI trong canh tác",
    excerpt:
      "Khám phá những công nghệ mới nhất đang thay đổi ngành nông nghiệp, từ cảm biến IoT đến trí tuệ nhân tạo.",
    content: `
      <h2>Giới thiệu về nông nghiệp thông minh</h2>
      <p>Nông nghiệp thông minh đang trở thành xu hướng không thể thiếu trong thời đại công nghệ 4.0. Việc ứng dụng IoT (Internet of Things) và AI (Artificial Intelligence) vào nông nghiệp đã mang lại những thay đổi tích cực, giúp nông dân tối ưu hóa quy trình sản xuất và nâng cao năng suất.</p>

      <h3>Ứng dụng IoT trong nông nghiệp</h3>
      <p>Các cảm biến IoT có thể theo dõi:</p>
      <ul>
        <li>Độ ẩm đất và không khí</li>
        <li>Nhiệt độ môi trường</li>
        <li>Lượng ánh sáng</li>
        <li>pH của đất</li>
        <li>Nồng độ dinh dưỡng</li>
      </ul>

      <h3>AI trong chẩn đoán bệnh cây trồng</h3>
      <p>Trí tuệ nhân tạo giúp:</p>
      <ul>
        <li>Phân tích hình ảnh để phát hiện bệnh sớm</li>
        <li>Dự đoán thời điểm tối ưu cho việc gieo trồng</li>
        <li>Tối ưu hóa việc sử dụng phân bón và thuốc bảo vệ thực vật</li>
        <li>Quản lý tưới tiêu thông minh</li>
      </ul>

      <h3>Lợi ích của nông nghiệp thông minh</h3>
      <p>Việc áp dụng công nghệ vào nông nghiệp mang lại nhiều lợi ích:</p>
      <ul>
        <li>Tăng năng suất cây trồng lên 20-30%</li>
        <li>Giảm chi phí sản xuất 15-25%</li>
        <li>Tiết kiệm nước tưới 30-40%</li>
        <li>Giảm sử dụng phân bón và thuốc bảo vệ thực vật</li>
        <li>Nâng cao chất lượng sản phẩm</li>
      </ul>

      <h3>Thách thức và giải pháp</h3>
      <p>Mặc dù có nhiều lợi ích, việc áp dụng công nghệ vào nông nghiệp vẫn gặp một số thách thức:</p>
      <ul>
        <li>Chi phí đầu tư ban đầu cao</li>
        <li>Thiếu kiến thức về công nghệ</li>
        <li>Hạ tầng mạng chưa đầy đủ ở nông thôn</li>
      </ul>

      <p>Để giải quyết những thách thức này, cần có sự hỗ trợ từ chính phủ, các tổ chức và doanh nghiệp trong việc đào tạo, tài chính và phát triển hạ tầng.</p>

      <h3>Kết luận</h3>
      <p>Nông nghiệp thông minh không chỉ là xu hướng mà đã trở thành nhu cầu thiết yếu để đảm bảo an ninh lương thực và phát triển bền vững. Việc đầu tư vào công nghệ ngay từ bây giờ sẽ giúp nông dân Việt Nam cạnh tranh tốt hơn trên thị trường quốc tế.</p>
    `,
    author: "Nguyễn Văn An",
    publishedAt: "2024-01-15",
    updatedAt: "2024-01-15",
    category: "Xu hướng",
    image:
      "https://s3zs55b05y.ufs.sh/f/mwEfFzLmOdgcSB5MvGr5LGj7qKJTyfuisnoMP0kODgcvYSX9",
    views: 1250,
    featured: true,
    tags: ["IoT", "AI", "Công nghệ", "Thông minh"],
  },
  {
    id: "2",
    title: "Kỹ thuật trồng lúa hữu cơ: Từ giống đến thu hoạch",
    excerpt:
      "Hướng dẫn chi tiết về quy trình trồng lúa hữu cơ, từ việc chọn giống đến các biện pháp chăm sóc và thu hoạch.",
    content: `
      <h2>Tổng quan về trồng lúa hữu cơ</h2>
      <p>Lúa hữu cơ là phương pháp canh tác không sử dụng phân bón hóa học, thuốc bảo vệ thực vật tổng hợp, mà chỉ sử dụng các chất hữu cơ tự nhiên. Đây là xu hướng canh tác bền vững, thân thiện với môi trường và tạo ra sản phẩm an toàn cho người tiêu dùng.</p>

      <h3>Chọn giống lúa phù hợp</h3>
      <p>Việc chọn giống là bước đầu tiên và quan trọng nhất:</p>
      <ul>
        <li>Chọn giống có sức đề kháng tốt với sâu bệnh</li>
        <li>Phù hợp với điều kiện khí hậu địa phương</li>
        <li>Có năng suất ổn định</li>
        <li>Chất lượng gạo tốt</li>
      </ul>

      <h3>Chuẩn bị đất</h3>
      <p>Đất trồng lúa hữu cơ cần được chuẩn bị kỹ lưỡng:</p>
      <ul>
        <li>Làm đất sâu 15-20cm</li>
        <li>Bón phân hữu cơ hoai mục</li>
        <li>Điều chỉnh pH đất về mức 6.0-7.0</li>
        <li>Đảm bảo hệ thống tưới tiêu tốt</li>
      </ul>

      <h3>Kỹ thuật gieo trồng</h3>
      <p>Quy trình gieo trồng lúa hữu cơ:</p>
      <ul>
        <li>Ngâm hạt giống trong dung dịch muối 3-5%</li>
        <li>Ủ hạt ở nhiệt độ 28-30°C trong 24-48 giờ</li>
        <li>Gieo mạ với mật độ 80-100g/m²</li>
        <li>Cấy lúa khi mạ 20-25 ngày tuổi</li>
      </ul>

      <h3>Chăm sóc và phòng trừ sâu bệnh</h3>
      <p>Biện pháp chăm sóc lúa hữu cơ:</p>
      <ul>
        <li>Sử dụng phân hữu cơ và phân vi sinh</li>
        <li>Áp dụng biện pháp phòng trừ tổng hợp IPM</li>
        <li>Sử dụng thuốc sinh học</li>
        <li>Luân canh với cây họ đậu</li>
      </ul>

      <h3>Thu hoạch và bảo quản</h3>
      <p>Thời điểm và cách thu hoạch:</p>
      <ul>
        <li>Thu hoạch khi 85-90% hạt chín vàng</li>
        <li>Cắt lúa vào buổi sáng sớm</li>
        <li>Phơi khô đến độ ẩm 14%</li>
        <li>Bảo quản trong kho khô ráo, thoáng mát</li>
      </ul>

      <h3>Hiệu quả kinh tế</h3>
      <p>Lúa hữu cơ mang lại nhiều lợi ích:</p>
      <ul>
        <li>Giá bán cao hơn lúa thường 20-30%</li>
        <li>Giảm chi phí phân bón và thuốc bảo vệ thực vật</li>
        <li>Cải thiện độ phì nhiêu của đất</li>
        <li>Bảo vệ môi trường sinh thái</li>
      </ul>
    `,
    author: "Trần Thị Bình",
    publishedAt: "2024-01-12",
    updatedAt: "2024-01-12",
    category: "Cây lương thực",
    image:
      "https://s3zs55b05y.ufs.sh/f/mwEfFzLmOdgcWLNwhKs6sMOUVjIabqFECHZkLdNr1mhyS5DA",
    views: 980,
    featured: true,
    tags: ["Lúa", "Hữu cơ", "Kỹ thuật", "Thu hoạch"],
  },
  {
    id: "3",
    title: "Trồng cà phê Arabica: Bí quyết cho vụ mùa chất lượng cao",
    excerpt:
      "Những kinh nghiệm quý báu trong việc trồng và chăm sóc cà phê Arabica để đạt chất lượng xuất khẩu.",
    content: `
      <h2>Giới thiệu về cà phê Arabica</h2>
      <p>Cà phê Arabica (Coffea arabica) là loại cà phê có chất lượng cao nhất, chiếm khoảng 60-70% sản lượng cà phê thế giới. Arabica có hương vị tinh tế, ít caffeine hơn Robusta và được ưa chuộng trên thị trường quốc tế.</p>

      <h3>Điều kiện sinh thái phù hợp</h3>
      <p>Cà phê Arabica phát triển tốt trong điều kiện:</p>
      <ul>
        <li>Độ cao: 800-2000m so với mặt nước biển</li>
        <li>Nhiệt độ: 18-24°C</li>
        <li>Lượng mưa: 1200-2000mm/năm</li>
        <li>Độ ẩm: 60-70%</li>
        <li>Đất chua nhẹ, pH 6.0-6.5</li>
      </ul>

      <h3>Kỹ thuật trồng</h3>
      <p>Quy trình trồng cà phê Arabica:</p>
      <ul>
        <li>Chọn giống: Typica, Bourbon, Caturra, Catuai</li>
        <li>Chuẩn bị đất: Làm đất sâu, bón phân hữu cơ</li>
        <li>Khoảng cách trồng: 2.5m x 2.5m</li>
        <li>Trồng cây che bóng: Bạch đàn, keo</li>
      </ul>

      <h3>Chăm sóc cây cà phê</h3>
      <p>Biện pháp chăm sóc quan trọng:</p>
      <ul>
        <li>Tưới nước đều đặn trong mùa khô</li>
        <li>Bón phân 3-4 lần/năm</li>
        <li>Cắt tỉa tạo tán cây</li>
        <li>Phòng trừ sâu bệnh</li>
      </ul>

      <h3>Thu hoạch và chế biến</h3>
      <p>Kỹ thuật thu hoạch:</p>
      <ul>
        <li>Thu hái quả chín đỏ đều</li>
        <li>Chế biến ướt hoặc khô</li>
        <li>Phơi khô đến độ ẩm 12-13%</li>
        <li>Bảo quản trong bao tải</li>
      </ul>

      <h3>Quản lý chất lượng</h3>
      <p>Để đạt chất lượng xuất khẩu:</p>
      <ul>
        <li>Tuân thủ quy trình GAP</li>
        <li>Kiểm soát độ ẩm</li>
        <li>Phân loại theo kích cỡ</li>
        <li>Đóng gói đúng cách</li>
      </ul>
    `,
    author: "Lê Minh Cường",
    publishedAt: "2024-01-10",
    updatedAt: "2024-01-10",
    category: "Cây công nghiệp",
    image:
      "https://s3zs55b05y.ufs.sh/f/mwEfFzLmOdgcpZZUq9IuS05shag14TMBArbJQyt9GK3mU7l6",
    views: 756,
    featured: false,
    tags: ["Cà phê", "Arabica", "Chất lượng", "Xuất khẩu"],
  },
  {
    id: "4",
    title: "Nông nghiệp tuần hoàn: Giải pháp bền vững cho tương lai",
    excerpt:
      "Tìm hiểu về mô hình nông nghiệp tuần hoàn và cách áp dụng vào thực tế sản xuất nông nghiệp Việt Nam.",
    content: `
      <h2>Khái niệm nông nghiệp tuần hoàn</h2>
      <p>Nông nghiệp tuần hoàn là mô hình sản xuất khép kín, trong đó chất thải từ một khâu sản xuất sẽ trở thành đầu vào cho khâu sản xuất khác, tạo thành một chu trình khép kín, giảm thiểu chất thải và tối đa hóa hiệu quả sử dụng tài nguyên.</p>

      <h3>Nguyên tắc cơ bản</h3>
      <p>Nông nghiệp tuần hoàn dựa trên các nguyên tắc:</p>
      <ul>
        <li>Giảm thiểu đầu vào (Reduce)</li>
        <li>Tái sử dụng (Reuse)</li>
        <li>Tái chế (Recycle)</li>
        <li>Khôi phục (Restore)</li>
      </ul>

      <h3>Mô hình VAC (Vườn - Ao - Chuồng)</h3>
      <p>Đây là mô hình nông nghiệp tuần hoàn phổ biến:</p>
      <ul>
        <li>Vườn: Trồng cây ăn quả, rau màu</li>
        <li>Ao: Nuôi cá, tôm</li>
        <li>Chuồng: Chăn nuôi gia súc, gia cầm</li>
      </ul>

      <h3>Lợi ích của nông nghiệp tuần hoàn</h3>
      <p>Mô hình này mang lại nhiều lợi ích:</p>
      <ul>
        <li>Giảm chi phí sản xuất 20-30%</li>
        <li>Tăng thu nhập 25-40%</li>
        <li>Bảo vệ môi trường</li>
        <li>Tạo ra sản phẩm sạch</li>
      </ul>

      <h3>Ứng dụng công nghệ</h3>
      <p>Công nghệ hỗ trợ nông nghiệp tuần hoàn:</p>
      <ul>
        <li>Hệ thống biogas</li>
        <li>Công nghệ xử lý chất thải</li>
        <li>Hệ thống tưới tiêu tự động</li>
        <li>Ứng dụng IoT giám sát</li>
      </ul>
    `,
    author: "Phạm Thị Dung",
    publishedAt: "2024-01-08",
    updatedAt: "2024-01-08",
    category: "Xu hướng",
    image:
      "https://s3zs55b05y.ufs.sh/f/mwEfFzLmOdgcDY0opKBhkqR97VxPlu2b30vFtJe8gjCrpTQO",
    views: 642,
    featured: false,
    tags: ["Bền vững", "Tuần hoàn", "Môi trường", "Tương lai"],
  },
  {
    id: "5",
    title: "Trồng rau sạch trong nhà kính: Công nghệ hydroponics",
    excerpt:
      "Hướng dẫn xây dựng hệ thống trồng rau thy canh trong nhà kính để sản xuất rau sạch quanh năm.",
    content: `
      <h2>Giới thiệu về hydroponics</h2>
      <p>Hydroponics hay thủy canh là phương pháp trồng cây không cần đất, thay vào đó sử dụng dung dịch dinh dưỡng hòa tan trong nước. Đây là công nghệ tiên tiến giúp sản xuất rau sạch với năng suất cao và chất lượng tốt.</p>

      <h3>Ưu điểm của hydroponics</h3>
      <p>Phương pháp này có nhiều ưu đi��m:</p>
      <ul>
        <li>Năng suất cao gấp 3-5 lần trồng đất</li>
        <li>Tiết kiệm nước 90%</li>
        <li>Không sử dụng thuốc trừ sâu</li>
        <li>Kiểm soát được dinh dưỡng</li>
        <li>Thu hoạch quanh năm</li>
      </ul>

      <h3>Các hệ thống hydroponics phổ biến</h3>
      <p>Có nhiều loại hệ thống khác nhau:</p>
      <ul>
        <li>NFT (Nutrient Film Technique)</li>
        <li>DWC (Deep Water Culture)</li>
        <li>Ebb and Flow</li>
        <li>Drip System</li>
      </ul>

      <h3>Thiết kế nhà kính</h3>
      <p>Yêu cầu cho nhà kính hydroponics:</p>
      <ul>
        <li>Khung thép mạ kẽm</li>
        <li>Tấm polycarbonate hoặc PE</li>
        <li>Hệ thống thông gió</li>
        <li>Hệ thống làm mát</li>
      </ul>

      <h3>Quản lý dinh dưỡng</h3>
      <p>Các yếu tố cần kiểm soát:</p>
      <ul>
        <li>EC (độ dẫn điện): 1.2-2.5</li>
        <li>pH: 5.5-6.5</li>
        <li>Nhiệt độ dung dịch: 18-22°C</li>
        <li>Hàm lượng oxy hòa tan</li>
      </ul>
    `,
    author: "Hoàng Văn Em",
    publishedAt: "2024-01-05",
    updatedAt: "2024-01-05",
    category: "Rau màu",
    image:
      "https://s3zs55b05y.ufs.sh/f/mwEfFzLmOdgcNfV8TeD0dS2k8Auza6TX45RoiJs9DIhOUrQP",
    views: 1100,
    featured: false,
    tags: ["Rau sạch", "Hydroponics", "Nhà kính", "Thủy canh"],
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
    Lateblight: {
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
    Earlyblight: {
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
    Septoria_leafspot: {
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
    Tomato_Yellow_Leaf_CurlVirus: {
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
    Bacterial_spot: {
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
    Tomato_mosaic_virus: {
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
    LeafMold: {
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
    Target_Spot: {
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
    Spider_mites: {
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
    Leafblight: {
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
    Blackrot: {
      symptoms: ["Đốm nâu/đen trên lá và quả, quả co lại", "Quả khô cứng, đen"],
      description: "Phoma viticola gây black rot, phá huỷ quả nho và lá.",
      treatment: "Cắt bỏ quả/ lá bệnh, thông thoáng, thuốc trừ nấm.",
    },
    Esca_BlackMeasles: {
      symptoms: ["Vết đốm đen trên cuống quả", "Quả nổ, rụng, lá bị tàn"],
      description:
        "Esca là bệnh do nhiều nấm (tổn thương gỗ), gây black measles trên quả.",
      treatment: "Loại bỏ phần gỗ bệnh, vệ sinh vườn, thuốc trừ nấm gỗ.",
    },
  },
  Orange: {
    Haunglongbing_Citrus_greening: {
      symptoms: ["Lá vàng không đồng đều (zebra)", "Quả xanh, thơm kém"],
      description:
        "HLB do vi khuẩn Candidatus Liberibacter spp. và lây truyền bởi bọ xít khế.",
      treatment: "Tiêu hủy cây bệnh, kiểm soát bọ xít, trồng giống kháng.",
    },
  },
  Squash: {
    Powdery_mildew: {
      symptoms: ["Lớp bột trắng trên mặt lá", "Lá vàng, khô"],
      description:
        "Bột trắng do nấm khô lên bề mặt lá, phát triển nhanh khi khô ấm.",
      treatment:
        "Loại bỏ lá bệnh, giữ thông thoáng, dùng thuốc trừ nấm chứa sulfur.",
    },
  },
  Potato: {
    Lateblight: {
      symptoms: ["Đốm nước trên lá/tubers, mốc trắng", "Thối nhũn"],
      description:
        "Phytophthora infestans gây Late blight, phá hủy khoai tây lá và củ.",
      treatment: "Cắt bỏ cây bệnh, thuốc trừ nấm, không để ẩm đọng.",
    },
    Earlyblight: {
      symptoms: ["Đốm tròn nâu với vòng đồng tâm trên lá", "Lá vàng rụng"],
      description:
        "Alternaria solani gây Early blight trên khoai tây và cà chua.",
      treatment: "Cắt bỏ lá bệnh, thuốc trừ nấm, luân canh.",
    },
  },
  Corn: {
    Northern_Leaf_Blight: {
      symptoms: ["Đốm dài nâu xám trên lá", "Lá khô lớn"],
      description:
        "Setosphaeria turcica gây Northern leaf blight khi khí hậu mát ẩm.",
      treatment: "Trồng giống kháng, luân canh, thuốc trừ nấm.",
    },
    Cercospora_Gray_leafspot: {
      symptoms: ["Đốm hình chữ nhật/bầu dục màu nâu xám", "Có viền viền vàng"],
      description:
        "Cercospora zeae-maydis gây gray leaf spot, gặp trong điều kiện nhiệt ẩm.",
      treatment: "Giống kháng, luân canh, thuốc trừ nấm.",
    },
    Commonrust: {
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
