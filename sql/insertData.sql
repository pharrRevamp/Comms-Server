INSERT INTO dbo.testing 
(avgDispatchTime, numOfHrsTCO,pctOfCallsUnder,TrainHoursEmpl,numOfSpecProg,pctOfBudgetUsed,numOfBudgetAdju,TtlNumOfCalls,TtlNumOfCallsPharr,TtlNumTrans,TtlNumILA,CompletionRate,pctCriteria,pctStaffCert,pctCertObtained)
VALUES
('${avgDispatchTime}','${numOfHrsTCO}','${pctOfCallsUnder}','${TrainHoursEmpl}','${numOfSpecProg}','${pctOfBudgetUsed}','${numOfBudgetAdju}','${TtlNumOfCalls}','${TtlNumOfCallsPharr}','${TtlNumTrans}','${TtlNumILA}','${CompletionRate}','${pctCriteria}','${pctStaffCert}','${pctCertObtained}')