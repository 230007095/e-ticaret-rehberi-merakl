
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const firms = [
  {
    id: 1,
    name: "Elesa Ganter",
    description: "Endüstriyel komponentler ve makine elemanları",
    icon: "🔧",
    color: "bg-blue-100",
    textColor: "text-blue-800",
  },
  {
    id: 2,
    name: "Halder",
    description: "Yüksek kaliteli sıkıştırma ve bağlantı elemanları",
    icon: "⚙️",
    color: "bg-red-100",
    textColor: "text-red-800",
  },
  {
    id: 3,
    name: "Kipp",
    description: "Makine ve cihaz yapımı için standart bileşenler",
    icon: "🛠️",
    color: "bg-green-100",
    textColor: "text-green-800",
  },
  {
    id: 4,
    name: "Winkel",
    description: "Lineer kılavuz teknolojisi ve taşıma tekniği",
    icon: "📏",
    color: "bg-orange-100",
    textColor: "text-orange-800",
  },
  {
    id: 5,
    name: "Schmalz",
    description: "Vakum bileşenleri ve otomasyon çözümleri",
    icon: "🔩",
    color: "bg-purple-100",
    textColor: "text-purple-800",
  },
  {
    id: 6,
    name: "Norelem",
    description: "Standart elemanlar ve normlanmış makine parçaları",
    icon: "⚗️",
    color: "bg-yellow-100",
    textColor: "text-yellow-800",
  },
];

const Firms = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      {firms.map((firm) => (
        <Link to={`/firms/${firm.id}`} key={firm.id}>
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardContent className={`${firm.color} ${firm.textColor} p-6 flex flex-col items-center justify-center text-center h-full`}>
              <div className="text-4xl mb-3">{firm.icon}</div>
              <h3 className="font-medium mb-1">{firm.name}</h3>
              <p className="text-xs mt-1 opacity-80">{firm.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default Firms;
