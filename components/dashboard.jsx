"use client"
import { Card, CardHeader, CardDescription, CardTitle, CardFooter, CardContent } from "@/components/ui/card"
import { CartesianGrid, XAxis, Bar, BarChart, Pie, PieChart, Line, LineChart } from "recharts"
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart"

export function OrderChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Trends</CardTitle>
        <CardDescription>Track the progress of your orders over time.</CardDescription>
      </CardHeader>
      <CardContent>
        <LinechartChart className="aspect-[16/9]" />
      </CardContent>
    </Card>
  )
}
export function UserChart({ data }) {
  console.log(data)
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Growth</CardTitle>
        <CardDescription>Monitor the growth of your user base.</CardDescription>
      </CardHeader>
      <CardContent>
        <BarchartChart data={data} className="aspect-[16/9]" />
      </CardContent>
    </Card>
  )
}
export function ProductChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Overview</CardTitle>
        <CardDescription>A breakdown of your product inventory and sales.</CardDescription>
      </CardHeader>
      <CardContent>
        <BarchartChart className="aspect-[16/9]" />
      </CardContent>
    </Card>
  )
}
export function ReviewChart({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Sentiment</CardTitle>
        <CardDescription>Analyze the sentiment of your customer reviews.</CardDescription>
      </CardHeader>
      <CardContent>
        <PiechartlabelChart data={data} className="aspect-[16/9]" />
      </CardContent>
    </Card>
  )
}
export function ProductCard({ data }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>Total Products</CardDescription>
        <CardTitle className="text-4xl">{data?.total}</CardTitle>
      </CardHeader>
      <CardFooter className="flex flex-col gap-2 items-start">
        <div className="flex items-center gap-2">
          <PackageIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">In Stock: {data?.active}</span>
        </div>
        <div className="flex items-center gap-2">
          <PackageXIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Out of Stock: {data?.inactive}</span>
        </div>
        <div className="flex items-center gap-2">
          <CirclePlusIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">New: {data?.newProducts}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
export function ReviewCard({ data }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>Total Reviews</CardDescription>
        <CardTitle className="text-4xl">{data?.total}</CardTitle>
      </CardHeader>
      <CardFooter className="flex flex-col gap-2 items-start">
        <div className="flex items-center gap-2">
          <StarIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Average Rating: {data?.average}</span>
        </div>
        <div className="flex items-center gap-2">
          <ThumbsUpIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Positive: {data?.positive}</span>
        </div>
        <div className="flex items-center gap-2">
          <ThumbsDownIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Negative: {data?.negative}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
export function OrderCard({ data }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>Total Orders</CardDescription>
        <CardTitle className="text-4xl">{data?.total}</CardTitle>
      </CardHeader>
      <CardFooter className="flex flex-col gap-2 items-start">
        <div className="flex items-center gap-2">
          <CheckIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Completed: {data?.completed}</span>
        </div>
        <div className="flex items-center gap-2">
          <ClockIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Pending: {data?.pending}</span>
        </div>
        <div className="flex items-center gap-2">
          <XIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Cancelled: {data?.cancelled}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
export function UserCard({ data }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>Total Users</CardDescription>
        <CardTitle className="text-4xl">{data?.total}</CardTitle>
      </CardHeader>
      <CardFooter className="flex flex-col gap-2 items-start">
        <div className="flex items-center gap-2">
          <UsersIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Active: {data?.active}</span>
        </div>
        <div className="flex items-center gap-2">
          <CirclePlusIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">New: {data?.newUsers}</span>
        </div>
        <div className="flex items-center gap-2">
          <LockIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Blocked: {data?.inactive}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

function BarchartChart({ data }) {
  console.log(data)
  const values = data
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const currentMonth = values?.currentMonth
  return (
    (<div>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="w-full min-h-[300px]">
        <BarChart
          accessibilityLayer
          data={[
            { month: months[currentMonth - 5], desktop: values.usersPastMonths[5] },
            { month: months[currentMonth - 4], desktop: values.usersPastMonths[4] },
            { month: months[currentMonth - 3], desktop: values.usersPastMonths[3] },
            { month: months[currentMonth - 2], desktop: values.usersPastMonths[2] },
            { month: months[currentMonth - 1], desktop: values.usersPastMonths[1] },
            { month: months[currentMonth], desktop: values.usersPastMonths[0] },
          ]}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" maxBarSize={40} radius={8} />
        </BarChart>
      </ChartContainer>
    </div>)
  );
}


function CheckIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>)
  );
}


function CirclePlusIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>)
  );
}


function ClockIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>)
  );
}


function LinechartChart(props) {
  return (
    (<div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}>
        <LineChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
          margin={{
            left: 12,
            right: 12,
          }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Line
            dataKey="desktop"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false} />
        </LineChart>
      </ChartContainer>
    </div>)
  );
}


function LockIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>)
  );
}


function PackageIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m7.5 4.27 9 5.15" />
      <path
        d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>)
  );
}


function PackageXIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
      <path d="m7.5 4.27 9 5.15" />
      <polyline points="3.29 7 12 12 20.71 7" />
      <line x1="12" x2="12" y1="22" y2="12" />
      <path d="m17 13 5 5m-5 0 5-5" />
    </svg>)
  );
}


function PiechartlabelChart(props) {
  const values = props?.data
  const data =
    [
      { reviews: "One Star", numbers: values?.oneStars, fill: "var(--color-oneStar)" },
      { reviews: "Two Star", numbers: values?.twoStars, fill: "var(--color-twoStar)" },
      { reviews: "Three Star", numbers: values?.threeStars, fill: "var(--color-threeStar)" },
      { reviews: "Four Star", numbers: values?.fourStars, fill: "var(--color-fourStar)" },
      { reviews: "Five Star", numbers: values?.fiveStars, fill: "var(--color-fiveStar)" },
    ]
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const value = data[index].numbers;

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        style={{ fontSize: '12px' }}
      >
        {value}
      </text>
    );
  };
  return (
    (<div>
      <ChartContainer
        config={{
          reviews: {
            label: "Reviews",
          },
          oneStar: {
            label: "One Star",
            color: "hsl(var(--chart-1))",
          },
          twoStar: {
            label: "Two Star",
            color: "hsl(var(--chart-2))",
          },
          threeStar: {
            label: "Three Star",
            color: "hsl(var(--chart-3))",
          },
          fourStar: {
            label: "Four Star",
            color: "hsl(var(--chart-4))",
          },
          fiveStar: {
            label: "Five Star",
            color: "hsl(var(--chart-5))",
          },
        }}
        className="mx-auto aspect-square max-h-[250px] pb-0">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={data}
            dataKey="numbers"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            nameKey="reviews" />
        </PieChart>
      </ChartContainer>
    </div>)
  );
}


function SearchIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>)
  );
}


function StarIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>)
  );
}


function ThumbsDownIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M17 14V2" />
      <path
        d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
    </svg>)
  );
}


function ThumbsUpIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M7 10v12" />
      <path
        d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>)
  );
}


function UsersIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>)
  );
}


function XIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>)
  );
}
