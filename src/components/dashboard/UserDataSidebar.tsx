import { Card } from "@/components/ui/card";
import { Heart, History, Search } from "lucide-react";

interface Props {
  favorites: string[];
  history: string[];
  onCityClick: (city: string) => void;
}

const DataList = ({
  title,
  icon: Icon,
  items,
  onCityClick,
}: {
  title: string;
  icon: React.ElementType;
  items: string[];
  onCityClick: (city: string) => void;
}) => {
  return (
    <Card className="p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="h-5 w-5" />
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.length > 0 ? (
          items.map((city) => (
            <li
              key={city}
              onClick={() => onCityClick(city)}
              className="flex justify-between items-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
            >
              <span>{city}</span>
              <Search className="h-4 w-4 text-gray-500" />
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-500">Nenhum item encontrado.</p>
        )}
      </ul>
    </Card>
  );
};

export function UserDataSidebar({ favorites, history, onCityClick }: Props) {
  return (
    <>
      <DataList
        title="Favoritos"
        icon={Heart}
        items={favorites}
        onCityClick={onCityClick}
      />
      <DataList
        title="Histórico"
        icon={History}
        items={history}
        onCityClick={onCityClick}
      />
    </>
  );
}
