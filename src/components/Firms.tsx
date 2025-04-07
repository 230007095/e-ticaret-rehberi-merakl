
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const firms = [
  {
    id: 1,
    name: "Elesa Ganter",
    icon: "🔧",
    color: "bg-blue-100",
    textColor: "text-blue-800",
  },
  {
    id: 2,
    name: "Halder",
    icon: "⚙️",
    color: "bg-red-100",
    textColor: "text-red-800",
  },
  {
    id: 3,
    name: "Kipp",
    icon: "🛠️",
    color: "bg-green-100",
    textColor: "text-green-800",
  },
  {
    id: 4,
    name: "Winkel",
    icon: "📏",
    color: "bg-orange-100",
    textColor: "text-orange-800",
  },
  {
    id: 5,
    name: "Schmalz",
    icon: "🔩",
    color: "bg-purple-100",
    textColor: "text-purple-800",
  },
  {
    id: 6,
    name: "Norelem",
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
              <h3 className="font-medium">{firm.name}</h3>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default Firms;
