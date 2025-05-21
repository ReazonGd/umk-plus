export default function Style() {
  return (
    <style>
      {`
     
        #umk-plus p {
            margin: 0;
        }
        #umk-plus{
            --primary-color: #F9BE2C;
            --secondary-color: #d7dfe3;
        }
        
        #umk-plus.course-view{
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        #umk-plus.dashboard{
            margin-bottom: 100px;
        }
        #umk-plus .stat-container .images {
            min-height: 500px;
            background: url("") no-repeat center center;
            background-size: cover;
            border-radius: 0px;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            min-width: 100%;
            overflow: hidden;
            position: relative;
        }

        #umk-plus .course-detail,
        #umk-plus .course-progress{
            width: 100%;
            background: white;
            border-radius: 0px;
            border: 1px solid var(--secondary-color);
            padding: 10px!important;
        }

        #umk-plus .course-progress {
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: center;
            justify-content: center;
        }

        #umk-plus .course-progress .row{
            width: 100%;
            align-items: center;
            justify-content: center;
            flex-flow: row;
        }

        #umk-plus .course-progress button{
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 10px!important;
        }

        #umk-plus .stat-container .images:hover .chage-image{
            opacity: 1;
        }
        #umk-plus .stat-container .images .chage-image{
            position: absolute;
            top: 10px;
            right: 10px;
            background: white;
            border-radius: 0%;
            padding: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            opacity: 0;
        }

        #umk-plus .line-clamp{
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
        }

        #umk-plus .stat-container {
            width: 100%;
            height: 100%;
        }
        #umk-plus .stat-container .images .stat{
            width: 100%;
            background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
            color: white;
            height: 200px;
            align-items: flex-end;
            justify-content: flex-end;
        }

        #umk-plus .stat-container .images .stat .row {
            width: 100%;
            justify-content: center;
            flex-flow: row;
            gap: 10px;
        }

        #umk-plus .stat-container .images .stat > .row  h4{
            color: white;
        }

        #umk-plus .course-progress .progress,
        #umk-plus .stat-container .progress{
            margin: 0;
            width: 100%;
            height: 10px;
            background: transparent;
        }

        #umk-plus .stat-container .images .stat .progress .progress-bar,
        #umk-plus .course-progress .progress .progress-bar{
            width: var(--progress-width);
            height: 100%;
            background: var(--primary-color);
        }

        #umk-plus .detail-n-progress,
        #umk-plus .row{
            display: flex;
            gap: 10px;
            flex-wrap: inherit;
            margin: 0;
        }

        #umk-plus .overflow{
            overflow: auto;
        }

        #umk-plus .column{
            display: flex;
            flex-direction: column;
            
            gap: 10px;
        }

        #umk-plus .task-card {
            width: 200px;
            border-radius: 0px;
            border: 1px solid var(--secondary-color);
            padding: 10px !important;
            background: white;
        }
        #umk-plus .task-card:hover{
            background: var(--primary-color);
            color: white;
        }
        #umk-plus .task-card .title{
            font-size: 1.2rem;
            font-weight: 600;
            -webkit-line-clamp: 2;
        }
        #umk-plus .task-card .class-name{
            font-size: .6rem;
            font-weight: 400;
            color: #00000050;
        }

        #umk-plus .task-card:hover .row-line{
            background: white;
        }
        
        #umk-plus .row-line{
            width: 100%;
            height: 1px;
            background: var(--secondary-color);
        }
        #umk-plus .column-line{
            width: 1px;
            height: 100%;
            background: var(--secondary-color);
        }
        #umk-plus .gap-0{
            gap: 0;
        }

        #umk-plus .schedule-card{
            width: 100%;
            border-radius: 0px;
            border: 1px solid var(--secondary-color);
            padding: 10px !important;
            background: white;
        }
        #umk-plus .schedule-card:hover{
            background: var(--primary-color);
            color: white;
        }
        #umk-plus .day-choice{
            cursor: pointer;
            opacity: .5;
        }
        #umk-plus .day-choice.active{
            opacity: 1;
        }
        #umk-plus .schedule-card .class-name{
            font-size: 1.2rem;
            font-weight: 600;
            -webkit-line-clamp: 2;
        }
        #umk-plus .schedule-card .class-code{
            font-size: .6rem;
            font-weight: 400;
            color: #00000050;
        }

        #umk-plus.dashboard{
            display: flex;
            gap: 10px;
        }

        #umk-plus .task-n-schedule{
            width: 100%;
            overflow: auto;
            max-height: 500px;
        }

        #umk-plus .no-schedule,
        #umk-plus .no-task{
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            height: 100px;
            width: 100%;
        }

        #umk-plus .schedule-list-container{
            height: 300px;
        }

        @media (max-width: 700px) {
            #umk-plus .detail-n-progress,
            #umk-plus.dashboard{
                flex-direction: column;
            }
            #umk-plus .stat-container .images{
                min-width: 100%;
            }
            #umk-plus .schedule-list-container{
                height: 100%;
            }

            #umk-plus .gradient-bottom{
                display: none;
            }

            #umk-plus .task-n-schedule{
                height: 100%;
                max-height: none;
            }
        }

        #umk-plus .toast-text{
            padding: 10px !important;
        }
        ::-webkit-scrollbar{
            display: none;
        }

        .pdf-view-button {
            outline: none;
            border: none;
            background: transparent;
            cursor: pointer;
            filter: grayscale(1);
        }

        .pdf-view-button:hover,
        .pdf-view-button.active {
            filter: grayscale(0);
        }
      `}
    </style>
  );
}
