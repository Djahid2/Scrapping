import { Bar } from "react-chartjs-2";
import useFetchData from "../hooks/useFetchData";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const FraudeRateChart = () => {
    const { data, loading, error } = useFetchData("blog/thesisdata/");

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data</p>;

    const chartData = {
        labels: data.map((point) => point.label),
        datasets: [
            {
                label: "Dataset",
                data: data.map((point) => point.value),
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default FraudeRateChart;
