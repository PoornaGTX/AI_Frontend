import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const MethodBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3 " />
        <XAxis dataKey="Year" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="DeathCount" fill="#2cb1bc" barSize={75}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index === data.length - 1 ? "#e3053c" : "#2cb1bc"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MethodBarChart;
