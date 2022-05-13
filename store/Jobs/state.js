export default () => ({
    listJobs: [
        {
            id: '1',
            name: "Start_EC2_Instances",
            description: "Start EC2 Instances Every Monday To Friday 7am",
            status: 1,
            schedule: "0 0 7 ? * MON-FRI",
            script: "",
        },{
            id: '2',
            name: "Stop_EC2_Instances",
            description: "Stop EC2 Instances Every Monday To Friday 7pm",
            status: 1,
            schedule: "0 0 19 ? * MON-FRI",
            script: "",
        },{
            id: '3',
            name: "Stop_EC2_Instances_temp",
            description: "Stop EC2 Instances Every Monday To Friday 12am",
            status: 1,
            schedule: "0 0 0 ? * MON-FRI",
            script: "",
        },{
            id: '4',
            name: "Temp_Start",
            description: "Temp_Start Every Saturday 3pm",
            status: 0,
            schedule: "0 0 15 ? * SAT",
            script: "",
        },{
            id: '5',
            name: "Temp_Stop",
            description: "Temp_Stop Every Saturday 11pm",
            status: 0,
            schedule: "0 0 11 ? * SAT",
            script: "",
        },
    ],
});