import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { fetchSessionsList } from "../api/cinemaApi";
import type { DaySchedule } from "../types";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

type Product = {
  id: number;
  title: string;
  price: number;
  rating: number;
  category: string;
};

export default function ChartPage() {
  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Products Charts
      </Typography>
      <ProductCharts />
      <Typography variant="h4" gutterBottom>
        Sessions Charts
      </Typography>
      <SessionsChart />
    </Box>
  );
}

function ProductCharts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=0");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError("Error loading chart data: " + (err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Chart 1: Number of Products per Category
  const categoryCount: Record<string, number> = {};

  // Count products per category
  products.forEach((product) => {
    categoryCount[product.category] =
      (categoryCount[product.category] || 0) + 1;
  });

  const countChartData = {
    labels: Object.keys(categoryCount),
    datasets: [
      {
        label: "Products per category",
        data: Object.values(categoryCount),
        backgroundColor: Object.values(categoryCount).map((count) =>
          count < 10 ? "rgba(53, 162, 235, 0.5)" : "rgba(255, 99, 132, 0.5)"
        ),
      },
    ],
  };

  const countOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  // Chart 2: Average Price per Category
  const categoryStats: Record<string, { total: number; count: number }> = {};

  // Calculate total price and count per category
  products.forEach(({ category, price }) => {
    if (!categoryStats[category]) {
      categoryStats[category] = { total: 0, count: 0 };
    }
    categoryStats[category].total += price;
    categoryStats[category].count += 1;
  });

  const avgPricesLabels = Object.keys(categoryStats);
  const avgPrices = avgPricesLabels.map(
    (category) => categoryStats[category].total / categoryStats[category].count
  );

  const generateColors = (count: number) => {
    return Array.from({ length: count }, (_, i) => {
      const hue = (i * 360) / count;
      return `hsla(${hue}, 70%, 60%, 0.6)`;
    });
  };

  const avgPriceChartData = {
    labels: avgPricesLabels,
    datasets: [
      {
        label: "Average price (USD)",
        data: avgPrices,
        backgroundColor: generateColors(avgPricesLabels.length),
      },
    ],
  };

  const avgPricesOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: { parsed: number }) =>
            `$${context.parsed.toFixed(2)}`,
        },
      },
    },
  };

  // Chart 3: Average Price vs Rating
  const ratingStats: Record<string, { total: number; count: number }> = {};

  // Calculate total price and count per rounded rating
  products.forEach(({ rating, price }) => {
    const roundedRating = rating.toFixed(1);

    if (!ratingStats[roundedRating]) {
      ratingStats[roundedRating] = { total: 0, count: 0 };
    }

    ratingStats[roundedRating].total += price;
    ratingStats[roundedRating].count += 1;
  });

  const ratingLabels = Object.keys(ratingStats).sort(
    (a, b) => Number(a) - Number(b)
  );

  const avgPricesPerRating = ratingLabels.map(
    (rating) => ratingStats[rating].total / ratingStats[rating].count
  );

  const ratingChartData = {
    labels: ratingLabels,
    datasets: [
      {
        label: "Average price vs rating",
        data: avgPricesPerRating,
        tension: 0.3,
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const ratingOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: { parsed: { y: number | null } }) =>
            `$${(context.parsed.y ?? 0).toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Rating",
        },
      },
      y: {
        title: {
          display: true,
          text: "Average price (USD)",
        },
      },
    },
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Number of Products per Category
      </Typography>
      <Bar data={countChartData} options={countOptions} />
      <Typography variant="h6" gutterBottom>
        Average Price per Category
      </Typography>
      <Pie data={avgPriceChartData} options={avgPricesOptions} />
      <Typography variant="h6" gutterBottom>
        Average Price vs Rating
      </Typography>
      <Line data={ratingChartData} options={ratingOptions} />
    </>
  );
}

function SessionsChart() {
  const [sessions, setSessions] = useState<DaySchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetchSessionsList();

        setSessions(response.sessionsList);
      } catch (err) {
        setError("Error loading chart data: " + (err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Chart: Number of Sessions per Day
  const sessionCount: Record<string, number> = {};

  // Count sessions per day
  sessions.forEach((day) => {
    sessionCount[day.date] = day.sessions.length;
  });

  const chartData = {
    labels: Object.keys(sessionCount),
    datasets: [
      {
        label: "Sessions per day",
        data: Object.values(sessionCount),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Number of Sessions per Day
      </Typography>
      <Bar data={chartData} options={options} />
    </>
  );
}
