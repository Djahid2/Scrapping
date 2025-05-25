import { useEffect, useState } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

// import Nav from "../components/nav";
// import FraudeRateChart from "../components/FraudeRateChart";
import blog from "../blog";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";
//   VITE v6.0.1  ready in 527 ms

//   ➜  Local:   http://localhost:5173/
//   ➜  Network: use --host to expose
export default function Dashboard() {
    {
        /** THESIS DATA */
    }
    {
        /** DATASET 1 */
    }
    // API to get ThesisData :
    const [thesisData, setThesisData] = useState([]);
    const [processedData,setProcessedData] = useState([]);
    
    const [chartData1, setChartData1] = useState({
        labels: [],
        datasets: [],
    });
    const [chartData2, setChartData2] = useState({
        labels: [],
        datasets: [],
    });
    const [chartData55, setChartData55] = useState({
        labels: [],
        datasets: [],
    });
    const [chartData58, setChartData58] = useState({
        labels: [],
        datasets: [],
    });
    const [chartData59, setChartData59] = useState({
        labels: [],
        datasets: [],
    });
    const [errorBars, setErrorBars] = useState([]);
    const [chartData60, setChartData60] = useState({
        labels: [],
        datasets: [],
    });
    const [chartData61, setChartData61] = useState({
        labels: [],
        datasets: [],
    });const [chartData62, setChartData62] = useState({
        labels: [],
        datasets: [],
    });const [chartData63, setChartData63] = useState({
        labels: [],
        datasets: [],
    });const [chartData64, setChartData64] = useState({
        labels: [],
        datasets: [],
    });



    const getThesisData = () => {
        blog.get("/blog/thesisdata/")
            .then((res) => res.data)
            .then((data) => {
                console.log("Fetched Thesis data:", data);
                setThesisData(data);
            })
            .catch((err) => alert(err));
    };

    useEffect(() => {
        getThesisData();
    }, []);
    const safeParseJSON = (str) => {
        try {
            return JSON.parse(str);
        } catch (e) {
            return null;
        }
    };
    useEffect(() => {
        if (thesisData.length > 0) {
            const allProcessedData = [];
    
            // Preparation des donnees
            for (let id = 52; id <= 64; id++) {
                const thesis = thesisData.find((item) => item.id === id);
                if (thesis) {
                    const info = safeParseJSON(thesis.info); 

                    // pourcentage --> nb
                    if (info && Array.isArray(info)) {
                        const parsedInfo = info.map((entry) => {
                            const parsedEntry = {};
                           
                            Object.keys(entry).forEach((key) => {
                                const value = entry[key];
                                
                                 if (typeof value === "string") {
                                if (/^\d+(\.\d+)?%$/.test(value.trim())) {
                                    parsedEntry[key] = parseFloat(value.replace('%', ''));
                                } else if (/^\+\d+(\.\d+)?%$/.test(value.trim())) {
                                    parsedEntry[key] = parseFloat(value.replace(/[\+%]/g, ''));
                                } else if (/^\d+% \(\d+ articles\)$/.test(value.trim())) {
                                    const match = value.match(/^(\d+(\.\d+)?)%/); 
                                    parsedEntry[key] = match ? parseFloat(match[1]) : value;
                                } else if (/^\d+(\.\d+)?$/.test(value.trim())) {
                                    parsedEntry[key] = parseFloat(value);
                                } else {
                                    parsedEntry[key] = value;
                                }
                            } else if (typeof value === "number") {
                                parsedEntry[key] = value;
                            } else {
                                parsedEntry[key] = value; 
                            }
                            });
                            return parsedEntry;
                        });
                        allProcessedData.push({
                            id: id,
                            data: parsedInfo, 
                        });
                    }                
                }
            }
    
            setProcessedData(allProcessedData);
            console.log("All processed data:", allProcessedData);
        }
    }, [thesisData]);

    useEffect(() =>{
        const dataChart1 = processedData.find((item) => item.id === 52);
        if (dataChart1) {
            const info = dataChart1.data;
            const labels = info.map((item) => item.Technique);
            const data = info.map((item) =>item.Frequency_of_use);

            setChartData1({
                labels: labels,
                datasets: [
                    {
                        label: "Frequency of Use",
                        data: data,
                        backgroundColor: [
                            "rgba(170, 201, 74, 0.8)",
                            "rgba(0, 150, 176, 0.8)",
                            "rgba(243, 127, 136, 0.8)",
                            "rgba(112, 92, 51, 0.8)",
                            "rgba(255, 99, 71, 0.8)",
                        ],
                        borderRadius: 5,
                    },
                ],
            });
        }

        const dataChart2 = processedData.find((item) => item.id === 53);
        if (dataChart2) {
            const info = dataChart2.data; 
            const filteredData = info.filter(item => item.description !== "max");
            
            const labels = filteredData.map((item) => item.description); 

            
            const stepValues = filteredData.map((item) => item.step); 
            const amountValues = filteredData.map((item) => item.amount);  
            const oldbalanceOrgValues = filteredData.map((item) => item.oldbalanceOrg);  
            const newbalanceOrgValues = filteredData.map((item) => item.newbalanceOrg);  
            const oldbalanceDestValues = filteredData.map((item) => item.oldbalanceDest);  
            const newbalanceDestValues = filteredData.map((item) => item.newbalanceDest);  


            
            setChartData2({
                labels: labels,
                datasets:[
                    {
                        label: "Step",
                        data: stepValues,
                        backgroundColor: "rgba(54, 162, 235, 0.6)",
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 1,
                        borderRadius: 5,
                    },
                    {
                        label: "Amount",
                        data: amountValues,
                        backgroundColor: "rgba(255, 99, 132, 0.6)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                        borderRadius: 5,
                    },
                    {
                        label: "Old Balance Org",
                        data: oldbalanceOrgValues,
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                        borderRadius: 5,
                    },
                    {
                        label: "New Balance Org",
                        data: newbalanceOrgValues,
                        backgroundColor: "rgba(153, 102, 255, 0.6)",
                        borderColor: "rgba(153, 102, 255, 1)",
                        borderWidth: 1,
                        borderRadius: 5,
                    },
                    {
                        label: "Old Balance Dest",
                        data: oldbalanceDestValues,
                        backgroundColor: "rgba(255, 159, 64, 0.6)",
                        borderColor: "rgba(255, 159, 64, 1)",
                        borderWidth: 1,
                        borderRadius: 5,
                    },
                    {
                        label: "New Balance Dest",
                        data: newbalanceDestValues,
                        backgroundColor: "rgba(255, 206, 86, 0.6)",
                        borderColor: "rgba(255, 206, 86, 1)",
                        borderWidth: 1,
                        borderRadius: 5,
                    },
                ],
            });
        }

        const dataChart55 = processedData.find((item) => item.id === 55);
        if (dataChart55) {
            const info = dataChart55.data; 
            
            const modelNames = info.map((item) => item.Model); 
            const trainPrecision = info.map((item) => item.train_precision);
            const testPrecision = info.map((item) => item.test_precision);
            const trainRecall = info.map((item) => item.train_recall); 
            const testRecall = info.map((item) => item.test_recall);

            setChartData55({
            labels: modelNames, 
            datasets: [
               // "rgba(75, 192, 192, 0.6)", 
               // 
                {
                    label: "Train Precision",
                    data: trainPrecision,
                    backgroundColor: "rgba(255, 99, 71, 0.8) ", 
                    borderRadius: 5,
                },
                {
                    label: "Test Precision",
                    data: testPrecision,
                    backgroundColor: "rgba(0, 150, 176, 0.8)",
                    borderRadius: 5,
                },
                {
                    label: "Train Recall",
                    data: trainRecall,
                    backgroundColor: 'rgba(170, 201, 74, 0.8)', // Couleur pour le rappel d'entraînement
                    borderRadius: 5,
                },
                {
                    label: "Test Recall",
                    data: testRecall,
                    backgroundColor: "rgba(243, 127, 136, 0.8)", // Couleur pour le rappel de test
                    borderRadius: 5,
                },
            ],});
        }

        const dataChart58 = processedData.find((item) => item.id === 58);
        if (dataChart58) {
            const info = dataChart58.data; 
            const stages = ['Raw_Data', 'Normalization', 'Missing_Imputation', 'Feature_Selection', 'SMOTE'];
            const algorithms = info.map((item) => item.Algorithm); 

           
            const datasets = stages.map((stage, index) => {
                return {
                    label: stage.replace('_', ' '), 
                    data: info.map((item) => item[stage]), 
                    backgroundColor: `rgba(
                        ${170 + index * 40}, 
                        ${201 - index * 20}, 
                        ${74 + index * 5}, 
                        ${0.8}
                    )`.replace(/\s+/g, ''), 
                    borderRadius: 5,
                };
            });


            setChartData58({
                labels: algorithms,
                datasets: datasets
           
            });            
        }

        const dataChart59 = processedData.find((item) => item.id === 59);
        if (dataChart59) {
            const info = dataChart59.data; 
            const labels = info.map((item) => item.Algorithm); 
            const meanScores = info.map((item) => item["Mean_F1-Score"]); 
            const deviations = info.map((item) => item.Standard_Deviation); 

            setChartData59({
                labels: labels,
                datasets: [
                    {
                        label: "Mean F1-Score",
                        data: meanScores,
                        backgroundColor:  [
                            "rgba(170, 201, 74, 0.8)",
                            "rgba(0, 150, 176, 0.8)",
                            "rgba(243, 127, 136, 0.8)",
                            "rgba(255, 99, 71, 0.8)",
                        ], 
                        borderRadius: 5,
                    },
                ],
            });  
            //barres d'erreur
            setErrorBars(deviations);          
        }
        

        const dataChart60 = processedData.find((item) => item.id === 60);
        if(dataChart60){
            const info = dataChart60.data; 
            const labels = info.map((item) => item.Metric);
            const bigDataAnalytics = info.map((item) => item.Big_Data_Analytics);
            const ruleBasedSystem = info.map((item) => item["Rule-based_System"]);

            setChartData60({
                labels: labels,
                datasets: [
                    {
                        label: "Big Data Analytics",
                        data: bigDataAnalytics,
                        backgroundColor: "rgba(170, 201, 74, 0.6)", 
                        borderColor: "rgba(170, 201, 74, 1)",
                        borderWidth: 1, 
                        borderRadius: 5,
                    },
                    {
                        label: "Rule-based System",
                        data: ruleBasedSystem,
                        backgroundColor: "rgba(255, 99, 71, 0.6)",
                        borderColor: "rgba(255, 99, 71, 1)",
                        borderWidth: 1, 
                        borderRadius: 5,
                    },
                ],
            });
        }

        const dataChart61 = processedData.find((item) => item.id === 61);
        if(dataChart61){
            const info = dataChart61.data; 
            const labels = info.map((item) => item.Metric);
            const diffrence = info.map((item) => item["Mean_Difference_(Big_Data_-_Rule-based)"]);

            setChartData61({
                labels: labels,
                datasets: [
                    {
                        label: "Mean Difference (Big Data - Rule-based)",
                        data: diffrence,
                        backgroundColor: "rgba(0, 150, 176, 0.6)", 
                        borderColor: "rgba(0, 150, 176, 1)",
                        borderWidth: 1,
                        borderRadius: 5,
                    },
                ],
            });
        }

        const dataChart62 = processedData.find((item) => item.id === 62);
        if(dataChart62){
            const info = dataChart62.data; 
            const labels = info.map((item) => item.Metric);
            const tStatistic = info.map((item) => item["t-Statistic"]);
            const pValue = info.map((item) => item["p-Value"]);

            setChartData62({
                labels: labels,
                datasets: [
                    {
                        label: "t-Statistic",
                        data: tStatistic,
                        backgroundColor: "rgba(0, 150, 176, 0.6)", 
                        borderColor: "rgba(0, 150, 176, 1)",
                        borderWidth: 1,
                        borderRadius: 5,
                    },
                    {
                        label: "p-Value",
                        data: pValue,
                        backgroundColor: "rgba(243, 127, 136, 0.6)",
                        borderColor: "rgba(243, 127, 136, 1)",
                        borderWidth: 1,
                        borderRadius: 5,
                    },
                ],
            });
        }

        const dataChart63 = processedData.find((item) => item.id === 63);
        if(dataChart63){
            const info = dataChart63.data; 
            const labels = info.map((item) => item.Metric);
            const bigData = info.map((item) => item.Big_Data_Analytics);
            const ruleBased = info.map((item) => item["Rule-based_System"]);
            const improvements = info.map((item) => item.Improvement);

            setChartData63({
                labels: labels,
                datasets: [
                    {
                        label: "Big Data Analytics",
                        data: bigData,
                        // backgroundColor: "rgba(75, 192, 192, 0.6)",
                        // borderColor: "rgba(75, 192, 192, 1)",
                        backgroundColor: "rgba(0, 150, 176, 0.6)", 
                        borderColor: "rgba(0, 150, 176, 1)",
                        borderWidth: 1,
                        borderRadius: 5,
                    },
                    {
                        label: "Rule-based System",
                        data: ruleBased,
                        // backgroundColor: "rgba(255, 99, 132, 0.6)",
                        // borderColor: "rgba(255, 99, 132, 1)",
                        backgroundColor: "rgba(243, 127, 136, 0.6)",
                        borderColor: "rgba(243, 127, 136, 1)",
                        borderWidth: 1,
                        borderRadius: 5,

                    },
                    {
                        label: "Improvement (%)",
                        data: improvements,
                        type: "line", 
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4, 
                        yAxisID: "y2", 
                    },
                ],
            });
        }

        const dataChart64 = processedData.find((item) => item.id === 64);
        if(dataChart64){
            const info = dataChart64.data; 
            const labels = info.map((item) => item['Sample number']);
            const actualFraudRates = info.map((item) => item["Actual fraud rate"]);
            const predictedFraudRates = info.map((item) => item["Predicted fraud rate"]);

            setChartData64({
                labels: labels,
                datasets: [
                    {
                        label: "Actual Fraud Rate (%)",
                        data: actualFraudRates,
                        backgroundColor: "rgba(75, 192, 192, 0.6)", 
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 2,
                        tension: 0.4,
                        borderRadius: 5,
                    },
                    {
                        label: "Predicted Fraud Rate (%)",
                        data: predictedFraudRates,
                        backgroundColor: "rgba(153, 102, 255, 0.6)",
                        borderColor: "rgba(153, 102, 255, 1)",
                        borderWidth: 2,
                        tension: 0.4,
                        borderRadius: 5,
                    },
                ],
            });
        }

        

        



    }, [processedData]);

    // >>>>>>> d8e3bdc1a6c3755724cb337b84541e80e8dd6e6c

    const revenueData = useSelector((state) => state.revenueData.data);
    const sample = useSelector((state) => state.sample.data);
    const sample3 = useSelector((state) => state.sample3.data);
    const [transactionData, setTransactionData] = useState({
        labels: [],
        counts: [],
        amounts: [],
    });

    const [amountRangesData, setAmountRangesData] = useState({
        labels: [],
        counts: [],
    });

    const [fraudData, setFraudData] = useState({
        labels: [],
        counts: [],
    });

    const [fraudData1, setFraudData1] = useState({
        transactionPercentage: [0, 0],
        amountPercentage: [0, 0],
    });

    const [fraudOverTime, setFraudOverTime] = useState([]);

    {
        /** DATASET 2 */
    }
    const [sample3Stats, setSample3Stats] = useState({
        fraudPercentage: [0, 0],
        transactionsByChannel: {},
        transactionsByHour: [],
    });
    const [sample3Data, setSample3Data] = useState({
        labels: [],
        counts: [],
        amounts: [],
    });

    const [sample3FraudData, setSample3FraudData] = useState({
        labels: [],
        counts: [],
    });

    useEffect(() => {
        {
            /** DATASET 1 */
        }
        // Process `sample.json` to extract fraud counts over time
        const stepCounts = {};

        // Process `sample.json` to extract insights
        const typeCounts = {};
        const typeAmounts = {};

        const amountRanges = {
            "<500": 0,
            "500-15000": 0,
            "15000-50000": 0,
            "50000-100000": 0,
            "100000-1000000": 0,
            ">1000000": 0,
        };

        // Process `sample.json` to extract fraudulent transaction data
        const fraudCounts = {};

        // Process the data to calculate fraud percentages
        let totalTransactions = 0;
        let fraudTransactions = 0;

        let totalAmount = 0;
        let fraudAmount = 0;

        sample.forEach((item) => {
            const type = item.type;
            const amount = parseFloat(item.amount);

            totalTransactions++;
            totalAmount += parseFloat(item.amount);

            // Count transactions by type
            typeCounts[type] = (typeCounts[type] || 0) + 1;

            // Sum amounts by type
            typeAmounts[type] = (typeAmounts[type] || 0) + amount;

            // Categorize amounts into ranges
            if (amount < 500) {
                amountRanges["<500"] += 1;
            } else if (amount >= 500 && amount < 15000) {
                amountRanges["500-15000"] += 1;
            } else if (amount >= 15000 && amount < 50000) {
                amountRanges["50000-100000"] += 1;
            } else if (amount >= 50000 && amount < 100000) {
                amountRanges["1000-5000"] += 1;
            } else if (amount >= 100000 && amount < 1000000) {
                amountRanges["5000-10000"] += 1;
            } else {
                amountRanges[">10000"] += 1;
            }

            if (item.isFraud === "1") {
                const type = item.type;
                fraudCounts[type] = (fraudCounts[type] || 0) + 1;
            }
            if (item.isFraud === "1") {
                const step = parseInt(item.step, 10);
                stepCounts[step] = (stepCounts[step] || 0) + 1;
            }
            if (item.isFraud === "1") {
                fraudTransactions++;
                fraudAmount += parseFloat(item.amount);
            }
        });

        // Prepare data sorted by steps
        const sortedData = Object.keys(stepCounts)
            .map((step) => ({
                label: `${step}`,
                count: stepCounts[step],
            }))
            .sort(
                (a, b) =>
                    parseInt(a.label.split(" ")[1]) -
                    parseInt(b.label.split(" ")[1])
            );

        setFraudOverTime(sortedData);

        setTransactionData({
            labels: Object.keys(typeCounts),
            counts: Object.values(typeCounts),
            amounts: Object.values(typeAmounts),
        });

        setAmountRangesData({
            labels: Object.keys(amountRanges),
            counts: Object.values(amountRanges),
        });

        setFraudData({
            labels: Object.keys(fraudCounts),
            counts: Object.values(fraudCounts),
        });

        const transactionPercentage = [
            ((fraudTransactions / totalTransactions) * 100).toFixed(2),
            (100 - (fraudTransactions / totalTransactions) * 100).toFixed(2),
        ];
        const amountPercentage = [
            ((fraudAmount / totalAmount) * 100).toFixed(2),
            (100 - (fraudAmount / totalAmount) * 100).toFixed(2),
        ];

        setFraudData1({
            transactionPercentage,
            amountPercentage,
        });

        ////////////////////////////////////////////////////////////////
        {
            /** DATASET 2 */
        }
        // Process the data for sample3.json
        let totalT = 0; // T:Transaction
        let fraudT = 0;
        let totalA = 0; //A:Amount
        let fraudA = 0;

        const channelCounts = {};
        const hourlyCounts = Array(24).fill(0); // Array for 24 hours, initialize to 0

        const transactionCounts = {};
        const transactionAmounts = {};
        const fraudCounts1 = {};

        sample3.forEach((item) => {
            totalT++;
            const amount = parseFloat(item.amount);
            totalA += amount;
            const type = item.card_type;

            // Update transaction counts and amounts
            transactionCounts[type] = (transactionCounts[type] || 0) + 1;
            transactionAmounts[type] = (transactionAmounts[type] || 0) + amount;

            // Update fraud counts
            if (item.is_fraud === "True") {
                fraudCounts1[type] = (fraudCounts1[type] || 0) + 1;
            }

            // Count fraudulent transactions
            if (item.is_fraud === "True") {
                fraudT++;
                fraudA += amount;
            }

            // Count transactions by channel
            channelCounts[item.channel] =
                (channelCounts[item.channel] || 0) + 1;

            // Count transactions by hour
            const hour = parseInt(item.transaction_hour, 10);
            hourlyCounts[hour]++;
        });

        // Convert to arrays for chart labels and data
        const labels = Object.keys(transactionCounts);
        const counts = Object.values(transactionCounts);
        const amounts = Object.values(transactionAmounts);
        const fraudLabels = Object.keys(fraudCounts1);
        const fraudCountsArray = Object.values(fraudCounts1);

        setSample3Data({ labels, counts, amounts });
        setSample3FraudData({ labels: fraudLabels, counts: fraudCountsArray });

        const fraudPercentage = [
            ((fraudT / totalT) * 100).toFixed(2),
            (100 - (fraudT / totalT) * 100).toFixed(2),
        ];
        const fraudTransactionPercentage = [
            ((fraudT / totalT) * 100).toFixed(2),
            (100 - (fraudT / totalT) * 100).toFixed(2),
        ];
        const fraudAmountPercentage = [
            ((fraudA / totalA) * 100).toFixed(2),
            (100 - (fraudA / totalA) * 100).toFixed(2),
        ];

        setSample3Stats({
            fraudPercentage,
            fraudTransactionPercentage,
            fraudAmountPercentage,
            transactionsByChannel: channelCounts,
            transactionsByHour: hourlyCounts,
        });
    }, []);

    return (
        <div className="theMaindivDash">
            <div className="container">
                {/** -------------------------------data: sample.json------------------------------- */}
                <div className="datasetCard">
                    <h2>Dataset 1</h2>
                    {/** Line Chart for Fraudulent Transactions Over Time */}
                    <div className="dataCard fraudOverTimeCard">
                        <Line
                            data={{
                                labels: fraudOverTime.map((data) => data.label),
                                datasets: [
                                    {
                                        label: "Number of Fraudulent Transactions",
                                        data: fraudOverTime.map(
                                            (data) => data.count
                                        ),
                                        borderColor: "rgba(170, 201, 74, 1)",
                                        backgroundColor: "rgba(170, 201, 74, 0.8)",
                                        borderWidth: 1,
                                    },
                                ],
                            }}
                            options={{
                                elements: {
                                    line: {
                                        tension: 0.7,
                                    },
                                },
                                plugins: {
                                    title: {
                                        text: "Transactions Frauduleuses Dans Le Temps (Steps)",
                                    },
                                },
                                scales: {
                                    x: {
                                        title: {
                                            display: true,
                                            text: "Time (Steps)",
                                        },
                                    },
                                    y: {
                                        title: {
                                            display: true,
                                            text: "Number of Fraudulent Transactions",
                                        },
                                    },
                                },
                            }}
                        />
                    </div>

                    {/* Bar Chart for Transaction Counts */}
                    <div className="dataCard customerCard">
                        <Bar
                            data={{
                                labels: transactionData.labels,
                                datasets: [
                                    {
                                        label: "Transaction Counts",
                                        data: transactionData.counts,
                                        backgroundColor: [
                                            "rgba(170, 201, 74, 0.8)",
                                            "rgba(0, 150, 176, 0.8)",
                                            "rgba(243, 127, 136, 0.8)",
                                            "rgba(112, 92, 51, 0.8)",
                                            "rgba(255, 99, 71, 0.8)",
                                        ],
                                        borderRadius: 5,
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    title: {
                                        text: "Type de Transactions",
                                    },
                                },
                            }}
                        />
                    </div>

                    {/* Bar Chart for Transaction Amounts */}
                    <div className="dataCard amountCard">
                        <Bar
                            data={{
                                labels: transactionData.labels,
                                datasets: [
                                    {
                                        label: "Transaction Amounts",
                                        data: transactionData.amounts,
                                        backgroundColor: [
                                            "rgba(170, 201, 74, 0.8)",
                                            "rgba(0, 150, 176, 0.8)",
                                            "rgba(243, 127, 136, 0.8)",
                                            "rgba(112, 92, 51, 0.8)",
                                            "rgba(255, 99, 71, 0.8)",
                                        ],
                                        borderRadius: 5,
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    title: {
                                        text: "Montant de Transactions par Type",
                                    },
                                },
                            }}
                        />
                    </div>

                    {/* Bar Chart for Fraudulent Transactions by Type */}
                    <div className="dataCard fraudCard">
                        <Bar
                            data={{
                                labels: fraudData.labels,
                                datasets: [
                                    {
                                        label: "Number of Fraudulent Transactions",
                                        data: fraudData.counts,
                                        backgroundColor: [
                                            "rgba(170, 201, 74, 0.8)",
                                            "rgba(0, 150, 176, 0.8)",
                                            "rgba(243, 127, 136, 0.8)",
                                            "rgba(112, 92, 51, 0.8)",
                                            "rgba(255, 99, 71, 0.8)",
                                        ],
                                        borderRadius: 5,
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    title: {
                                        text: "Fraude par Type",
                                    },
                                },
                            }}
                        />
                    </div>

                    {/** Doughnut for Fraudulent Transactions Percentage */}
                    <div className="dataCard fraudTransactionCard">
                        <Doughnut
                            data={{
                                labels: ["Fraud", "Normal"],
                                datasets: [
                                    {
                                        data: fraudData1.transactionPercentage,
                                        backgroundColor: [
                                            "rgba(243, 127, 136, 0.8)",
                                            "rgba(0, 150, 176, 0.8)",
                                        ],
                                        borderColor: [
                                            "rgba(243, 127, 136, 1)",
                                            "rgba(0, 150, 176, 1)",
                                        ],
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    title: {
                                        text: "Fraude dans le total des Transactions",
                                    },
                                },
                            }}
                        />
                    </div>

                    {/** Doughnut for Fraudulent Amount Percentage */}
                    <div className="dataCard fraudAmountCard">
                        <Doughnut
                            data={{
                                labels: ["Fraud", "Normal"],
                                datasets: [
                                    {
                                        data: fraudData1.amountPercentage,
                                        backgroundColor: [
                                            "rgba(243, 127, 136, 0.8)",
                                            "rgba(0, 150, 176, 0.8)",
                                        ],
                                        borderColor: [
                                            "rgba(243, 127, 136, 1)",
                                            "rgba(0, 150, 176, 1)",
                                        ],
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    title: {
                                        text: "Fraude dans le Montant total",
                                    },
                                },
                            }}
                        />
                    </div>
                </div>

                {/** -------------------------------data: sample3.json------------------------------- */}
                <div className="datasetCard">
                    <h2>Dataset 2</h2>
                    <hr />
                    {/** Bar Chart for Transaction Counts */}
                    <div className="dataCard customerCard">
                        <Bar
                            data={{
                                labels: sample3Data.labels, // Transaction types
                                datasets: [
                                    {
                                        label: "Transaction Counts",
                                        data: sample3Data.counts, // Number of transactions by type
                                        backgroundColor: [
                                            "rgba(170, 201, 74, 0.8)",
                                            "rgba(0, 150, 176, 0.8)",
                                            "rgba(243, 127, 136, 0.8)",
                                            "rgba(112, 92, 51, 0.8)",
                                            "rgba(255, 99, 71, 0.8)",
                                        ],
                                        borderRadius: 5,
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    title: {
                                        text: "Type de Transactions",
                                    },
                                },
                            }}
                        />
                    </div>

                    {/** Bar Chart for Transaction Amounts */}
                    <div className="dataCard amountCard">
                        <Bar
                            data={{
                                labels: sample3Data.labels, // Transaction types
                                datasets: [
                                    {
                                        label: "Transaction Amounts",
                                        data: sample3Data.amounts, // Total amount of transactions by type
                                        backgroundColor: [
                                            "rgba(170, 201, 74, 0.8)",
                                            "rgba(0, 150, 176, 0.8)",
                                            "rgba(243, 127, 136, 0.8)",
                                            "rgba(112, 92, 51, 0.8)",
                                            "rgba(255, 99, 71, 0.8)",
                                        ],
                                        borderRadius: 5,
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    title: {
                                        text: "Montant de Transactions par Type",
                                    },
                                },
                            }}
                        />
                    </div>

                    {/** Bar Chart for Fraudulent Transactions by Type */}
                    <div className="dataCard fraudCard">
                        <Bar
                            data={{
                                labels: sample3FraudData.labels, // Transaction types (fraudulent)
                                datasets: [
                                    {
                                        label: "Number of Fraudulent Transactions",
                                        data: sample3FraudData.counts, // Fraudulent transactions count by type
                                        backgroundColor: [
                                            "rgba(170, 201, 74, 0.8)",
                                            "rgba(0, 150, 176, 0.8)",
                                            "rgba(243, 127, 136, 0.8)",
                                            "rgba(112, 92, 51, 0.8)",
                                            "rgba(255, 99, 71, 0.8)",
                                        ],
                                        borderRadius: 5,
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    title: {
                                        text: "Fraude par Type",
                                    },
                                },
                            }}
                        />
                    </div>

                    {/** Doughnut for Fraudulent Transactions Percentage */}
                    <div className="dataCard fraudTransactionCard">
                        <Doughnut
                            data={{
                                labels: ["Fraud", "Normal"],
                                datasets: [
                                    {
                                        data: sample3Stats.fraudTransactionPercentage,
                                        backgroundColor: [
                                            "rgba(243, 127, 136, 0.8)",
                                            "rgba(0, 150, 176, 0.8)",
                                        ],
                                        borderColor: [
                                            "rgba(243, 127, 136, 1)",
                                            "rgba(0, 150, 176, 1)",
                                        ],
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    title: {
                                        text: "Fraude dans le total des Transactions",
                                    },
                                },
                            }}
                        />
                    </div>

                    {/** Doughnut for Fraudulent Amount Percentage */}
                    <div className="dataCard fraudAmountCard">
                        <Doughnut
                            data={{
                                labels: ["Fraud", "Normal"],
                                datasets: [
                                    {
                                        data: sample3Stats.fraudAmountPercentage,
                                        backgroundColor: [
                                            "rgba(243, 127, 136, 0.8)",
                                            "rgba(0, 150, 176, 0.8)",
                                        ],
                                        borderColor: [
                                            "rgba(243, 127, 136, 1)",
                                            "rgba(0, 150, 176, 1)",
                                        ],
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    title: {
                                        text: "Fraude dans le Montant total",
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
                <div className="datasetCard">
                    <h2>Thesis Dashboard</h2>
                    <hr />
                    <div className="dataCard thesisData4">
                        <Bar
                            data={chartData1}
                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        text: "Frequency of Use of Techniques",
                                    },
                                },
                            }}
                        />
                    </div>
                    <div className="dataCard thesisData3">
                        <Bar
                            data={chartData2}
                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        text: "Summary Statistics of Numeric Variables",
                                    },
                                    legend: {
                                        display: true,
                                        position: "top",
                                    },
                                },
                            }}
                        />
                    </div>    
                    {/* chartData55 */}
                    <div className="dataCard thesisData1">
                    <Bar
                        data={chartData55}
                        options={{
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Comparaison des modèles - Précision et Rappel',
                                },
                                tooltip: {
                                    callbacks: {
                                        label: function (context) {
                                            return `${context.dataset.label}: ${context.raw}%`; // Affichage personnalisé dans le tooltip
                                        },
                                    },
                                },
                            },
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Modèles',
                                    },
                                    grid: {
                                        offset: true, 
                                    },
                                    barPercentage: 0.6, 
                                    categoryPercentage: 0.5, 
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Pourcentage',
                                    },
                                    beginAtZero: true,
                                    max: 110, 
                                },
                            },
                            indexAxis: 'x',
                        }}
                    />
                    </div>
                    <div className="dataCard thesisData2">
                        <Bar
                            data={chartData58}
                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'Comparison of Algorithms Across Data Processing Stages',
                                    },
                                    legend: {
                                        position: 'top', 
                                    },
                                },
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Algorithms',
                                        },
                                        grid: {
                                            offset: true,
                                        },
                                        categoryPercentage: 0.7,
                                        barPercentage: 0.9,
                                    },
                                    y: {
                                        title: {
                                            display: true,
                                            text: 'Scores',
                                        },
                                        beginAtZero: true,
                                        max: 1.0, 
                                    },
                                },
                            }}
                        />                        
                    </div>
                    <div className="dataCard thesisData5">
                        <Bar
                            data={chartData59}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: "Mean F1-Score with Standard Deviation (Error Bars)",
                                    },
                                    tooltip: {
                                        callbacks: {
                                            afterBody: function (tooltipItems) {
                                                const index = tooltipItems[0].dataIndex;
                                                return `± Std Dev: ${errorBars[index]}`;
                                            },
                                        },
                                    },
                                },
                                scales: {
                                    x: {
                                        title: {
                                            display: true,
                                            text: "Algorithms",
                                        },
                                    },
                                    y: {
                                        title: {
                                            display: true,
                                            text: "F1-Score",
                                        },
                                        beginAtZero: true,
                                        max: 1.0, 
                                    },
                                },
                            }}
                        />
                    </div>
                    <div className="dataCard thesisData6">
                        <Bar
                            data={chartData60}
                            options={{
                                responsive: true,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: "Metrics Comparison: Big Data Analytics vs Rule-based System",
                                    },
                                    legend: {
                                        position: "top",
                                    },
                                },
                                scales: {
                                    x: {
                                        title: {
                                            display: true,
                                            text: "Metrics",
                                        },
                                    },
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: "Values",
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                    <div className="dataCard thesisData1">
                        <Bar
                            data={chartData61}
                            options={{
                                responsive: true,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: "Mean Difference: Big Data vs Rule-based",
                                    },
                                    legend: {
                                        display: true,
                                        position: "top",
                                    },
                                },
                                scales: {
                                    x: {
                                        title: {
                                            display: true,
                                            text: "Metrics",
                                        },
                                    },
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: "Mean Difference",
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                    <div className="dataCard thesisData1">
                        <Bar
                            data={chartData62}
                            options={{
                                responsive: true,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: "t-Statistic and p-Value for Each Metric",
                                    },
                                    legend: {
                                        display: true,
                                        position: "top",
                                    },
                                },
                                scales: {
                                    x: {
                                        title: {
                                            display: true,
                                            text: "Metrics",
                                        },
                                    },
                                    y: {
                                        type: "logarithmic",
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: "Values(logarithmi)",
                                        },
                                        ticks: {
                                            callback: (value) => value.toExponential(),
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                    <div className="dataCard thesisData1">
                        <Bar
                            data={chartData63}
                            options={{
                                responsive: true,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: "Performance Comparison with Improvement",
                                    },
                                    legend: {
                                        display: true,
                                        position: "top",
                                    },
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: "Performance (%)",
                                        },
                                    },
                                    y2: {
                                        position: "right",
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: "Improvement (%)",
                                        },
                                        grid: {
                                            drawOnChartArea: false, 
                                        },
                                    },
                                },
                            }}
                        />                       
                    </div>
                    <div className="dataCard thesisData1">
                        <Line
                            data={chartData64}
                            options={{
                                responsive: true,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: "Fraud Rate (%)",
                                        },
                                    },
                                    x: {
                                        title: {
                                            display: true,
                                            text: "Samples",
                                        },
                                    },
                                },
                                plugins: {
                                    title: {
                                        display: true,
                                        text: "Comparison of Actual and Predicted Fraud Rates",
                                    },
                                    legend: {
                                        display: true,
                                        position: "top",
                                    },
                                    tooltip: {
                                        callbacks: {
                                            label: (context) =>
                                                `${context.dataset.label}: ${context.raw.toFixed(2)}%`,
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                    {/* <h2>Thesis Data</h2>
                    <hr />
                    <ul>
                        {thesisData.map((thesis) => (
                            <li key={thesis.id}>
                                <h2 className="titleThesisData">
                                    {thesis.titre}
                                </h2>
                                <p>{thesis.Scrap_statique_data}</p>
                                <div>
                                    <h3>Info:</h3>
                                    <pre>
                                        {safeParseJSON(thesis.info)
                                            ? JSON.stringify(
                                                  safeParseJSON(thesis.info),
                                                  null,
                                                  2
                                              )
                                            : "Invalid or missing data"}
                                    </pre>
                                </div>
                            </li>
                        ))}
                    </ul> */}
                </div>
            </div>
        </div>
    );
}
