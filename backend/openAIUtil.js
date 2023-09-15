export const formatOpenAIQuery = (formVals) => {
  const queryBaseSection = `Write a HPI and differential diagnosis for a patient of ${formVals['age']} and ${formVals['sex']} 
  complaining of ${formVals['chiefComplaint']} that started ${formVals['onsetDate']}.`
  const queryPainSection = formVals['painRating'] !== ""
      ? ` The patient rates the pain ${formVals['painRating']} / 10 and their symptoms currently include ${formVals['symptoms']}.`
      : ` The patient has the follwing symptoms: ${formVals['symptoms']}`;
  const queryModifyingFactorsSection = formVals['modifyingFactors'] !== ""
      ? ` The patient has tried to alleviate their symptoms by ${formVals['modifyingFactors']}`
      : "";
  return queryBaseSection + queryPainSection + queryModifyingFactorsSection;
}