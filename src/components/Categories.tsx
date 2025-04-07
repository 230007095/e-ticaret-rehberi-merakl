
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Elektronik",
    icon: "📱",
    color: "bg-blue-100",
    textColor: "text-blue-800",
  },
  {
    id: 2,
    name: "Giyim",
    icon: "👕",
    color: "bg-pink-100",
    textColor: "text-pink-800",
  },
  {
    id: 3,
    name: "Ev & Yaşam",
    icon: "🏠",
    color: "bg-green-100",
    textColor: "text-green-800",
  },
  {
    id: 4,
    name: "Spor",
    icon: "⚽",
    color: "bg-orange-100",
    textColor: "text-orange-800",
  },
  {
    id: 5,
    name: "Kozmetik",
    icon: "💄",
    color: "bg-purple-100",
    textColor: "text-purple-800",
  },
  {
    id: 6,
    name: "Kitap & Müzik",
    icon: "📚",
    color: "bg-yellow-100",
    textColor: "text-yellow-800",
  },
];

const Categories = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      {categories.map((category) => (
        <Link to={`/categories/${category.id}`} key={category.id}>
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardContent className={`${category.color} ${category.textColor} p-6 flex flex-col items-center justify-center text-center h-full`}>
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="font-medium">{category.name}</h3>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
