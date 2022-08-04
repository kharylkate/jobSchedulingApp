export default () => ({
    listJobs: [],
    jobById: {},
    cronTail: {},
    listFiles: [],
    fileById: {},
    listScheduledTasks: [],
    
    // listJobs: [
    //     {
    //         id: '1',
    //         name: "Start_EC2_Instances",
    //         command: "pwd",
    //         status: 1,
    //         schedule: "0 0 7 ? * MON-FRI",
    //         created_by: "Jihaha Guiapal",
    //         target: null
    //     },{
    //         id: '2',
    //         name: "Stop_EC2_Instances",
    //         command: "Stop EC2 Instances Every Monday To Friday 7pm",
    //         status: 1,
    //         schedule: "0 0 19 ? * MON-FRI",
    //         created_by: "Jihaha Guiapal",
    //         target: null
    //     },{
    //         id: '3',
    //         name: "Stop_EC2_Instances_temp",
    //         command: "Stop EC2 Instances Every Monday To Friday 12am",
    //         status: 1,
    //         schedule: "0 0 0 ? * MON-FRI",
    //         created_by: "Jihaha Guiapal",
    //         target: null
    //     },{
    //         id: '4',
    //         name: "Temp_Start",
    //         command: "Temp_Start Every Saturday 3pm",
    //         status: 0,
    //         schedule: "0 0 15 ? * SAT",
    //         created_by: "Jihaha Guiapal",
    //         target: null
    //     },{
    //         id: '5',
    //         name: "Temp_Stop",
    //         command: "Temp_Stop Every Saturday 11pm",
    //         status: 0,
    //         schedule: "0 0 11 ? * SAT",
    //         created_by: "Jihaha Guiapal",
    //         target: null
    //     },
    // ],
});