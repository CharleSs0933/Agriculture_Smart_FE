export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-16  bg-green-50">
      <div className=" px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              AI Chẩn Đoán Bệnh Cây Trồng
            </h1>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Tải lên hình ảnh cây trồng của bạn và để AI của chúng tôi phân
              tích, chẩn đoán bệnh và đề xuất các sản phẩm điều trị phù hợp.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
