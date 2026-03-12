import type { ProductSize } from "@/lib/mock/productDetails";

export type SizeChartRow = {
  size: ProductSize;
  abayaLength: string;
  bodyHeight: string;
};

export const abayaSizeChartRows: SizeChartRow[] = [
  { size: "XS", abayaLength: "127 – 132 cm", bodyHeight: "150 – 155 cm" },
  { size: "S", abayaLength: "132 – 137 cm", bodyHeight: "156 – 160 cm" },
  { size: "M", abayaLength: "137 – 142 cm", bodyHeight: "161 – 165 cm" },
  { size: "L", abayaLength: "142 – 147 cm", bodyHeight: "166 – 170 cm" },
  { size: "XL", abayaLength: "147 – 152 cm", bodyHeight: "171 – 175 cm" },
];
