const data = 
[{"model": "mathematics.question", "pk": 21, "fields": {"code": "0.1", "category": 5, "problem": "Two events A and B each having probability 0.5 and 0.7, respectively. The probability for A and B happen at the same time should be", "problempicture1": "", "problempicture2": "", "problempicture3": "", "problempicture4": "", "problempicture5": "", "problempicture6": "", "choicesa": "1", "choicesb": "smaller than 0.2", "choicesc": "at least 0.2", "choicesd": "0", "choicese": "None of the above is correct.", "choicesf": "", "choicepicturea": "", "choicepictureb": "", "choicepicturec": "", "choicepictured": "", "choicepicturee": "", "choicepicturef": "", "answer": "C", "solutionspicture1": "", "solutionspicture2": "", "solutionspicture3": "", "solutions": "The key to solve this question is  $$ P(A\\cap B) = P(A) +P(B) - P(A\\cup B)$$\r\n With  $ P(A) = 0.5  $ and $ P(B) = 0.7 $, $ P(A\\cap B) $ = $ 1.2 -P(A\\cup B) $. Although we do not know the value of $ P(A\\cup B) $. But it must between 0.7 and 1. Larger than $ P(B) $ but less than 1. So the value of $ P(A\\cap B) $ must between 0.2 and 0.5. So the answer is c.", "linkability1": 1.0, "linkability2": 1.0, "linkability3": 2.0, "linkability4": 2.0, "linkability5": 0.0, "linkability6": 0.0, "linkpersonaility": 0.0, "errors": "A", "alternativesolutions": "", "messagefailure": "Don't worry! Just try it again.", "messagesuccess": "Congratulations! You have successfully finished your first question.", "sensitivity": 1.0, "gussingparameter": null, "difficulty": 1, "calculateddifficulty": null, "linkneuron": [23], "rightproblems": [], "wrongproblems": [], "twinproblems": []}}, {"model": "mathematics.question", "pk": 22, "fields": {"code": "0.2", "category": 5, "problem": "There are three events: $ A $ and $ B $ and $ C $. We know $ P(A|B) = P(B|C) = 0.5$. Then $ P(A|C) $ should be", "problempicture1": "", "problempicture2": "", "problempicture3": "", "problempicture4": "", "problempicture5": "", "problempicture6": "", "choicesa": "0", "choicesb": "0.25", "choicesc": "0.5", "choicesd": "1", "choicese": "None of the above is correct.", "choicesf": "", "choicepicturea": "", "choicepictureb": "", "choicepicturec": "", "choicepictured": "", "choicepicturee": "", "choicepicturef": "", "answer": "E", "solutionspicture1": "", "solutionspicture2": "", "solutionspicture3": "", "solutions": "Unfortunately, there is no answer for what is the value of $ P(A|C) $. In the different case, the value of $ P(A|C) $ is different. Think about the two later case.\r\n<br>\r\n The first one is $ A, B, C $ are independent with $ P(A) = P(B) = P(C) = 0.5$. We can see they satisfy the condition in the question.  $ P(A|C) $ there is 0.5.\r\n<br>\r\n The second one is $ A =C $ and they are independent of $ B $. We also have  $ P(A) = P(B) = P(C) = 0.5$. They satisfy the condition in the question.  $ P(A|C) $ there is 1.\r\n So there is no answer for what is the value of $ P(A|C) $.\r\n<br>\r\n Attention! $ P(A|B)  P(B|C) \\neq P(A|C)$.", "linkability1": 2.0, "linkability2": 1.0, "linkability3": 2.0, "linkability4": 2.0, "linkability5": 0.0, "linkability6": 0.0, "linkpersonaility": 0.0, "errors": "B", "alternativesolutions": "", "messagefailure": "Don't worry! Just try it again.", "messagesuccess": "Congratulations! You have the right answer.", "sensitivity": 1.0, "gussingparameter": null, "difficulty": 2, "calculateddifficulty": null, "linkneuron": [25], "rightproblems": [], "wrongproblems": [], "twinproblems": []}}, {"model": "mathematics.question", "pk": 23, "fields": {"code": "0.3", "category": 5, "problem": "For a random variable $ X $, which the statement below is correct?", "problempicture1": "", "problempicture2": "", "problempicture3": "", "problempicture4": "", "problempicture5": "", "problempicture6": "", "choicesa": "If $ X  \\sim$ Binomial$(n,p)$, then $ Var X = np $.", "choicesb": "If $ X  \\sim$ Poisson$(\\lambda)$, then $ Var X = \\lambda^2 $.", "choicesc": "If $ X  \\sim$ $N(\\mu,\\sigma^2)$, then $ Var X = \\mu $.", "choicesd": "If $ X \\sim $ Geometric$ (p) $, then $ Var X $ = $ \\frac{p}{(1-p)^2} $", "choicese": "None of the above is correct.", "choicesf": "", "choicepicturea": "", "choicepictureb": "", "choicepicturec": "", "choicepictured": "", "choicepicturee": "", "choicepicturef": "", "answer": "D", "solutionspicture1": "", "solutionspicture2": "", "solutionspicture3": "", "solutions": "We just see it one by one.\r\n<br>\r\n(a). If $ X  \\sim$ Binomial$(n,p)$, then $ Var X = np(1-p) $.\r\n<br>\r\n(b). If $ X  \\sim$ Poisson$(\\lambda)$, then $ Var X = \\lambda $.\r\n<br>\r\n(c). If $ X  \\sim$ $N(\\mu,\\sigma^2)$, then $ Var X = \\sigma^2 $.\r\n<br>\r\n(d). It is the right answer.", "linkability1": 2.0, "linkability2": 1.0, "linkability3": 1.0, "linkability4": 0.0, "linkability5": 0.0, "linkability6": 0.0, "linkpersonaility": 0.0, "errors": "B", "alternativesolutions": "", "messagefailure": "Don't worry! Next time you will remember the variance.", "messagesuccess": "Congratulations! You have the correct answer.", "sensitivity": 1.0, "gussingparameter": null, "difficulty": 1, "calculateddifficulty": null, "linkneuron": [31], "rightproblems": [], "wrongproblems": [], "twinproblems": []}}, {"model": "mathematics.question", "pk": 24, "fields": {"code": "0.4", "category": 5, "problem": "Two random variables $ X $ and $ Y $ follow the same distribution. Then", "problempicture1": "", "problempicture2": "", "problempicture3": "", "problempicture4": "", "problempicture5": "", "problempicture6": "", "choicesa": "The distribution of $ X-Y $ must be symmetric about 0.", "choicesb": "The median of $ X-Y $ must be zero.", "choicesc": "The median of $ X+Y $ is twice of the median of $ X $.", "choicesd": "The mean of $ X-Y $, if finite, must be 0.", "choicese": "None of the above is correct.", "choicesf": "", "choicepicturea": "", "choicepictureb": "", "choicepicturec": "", "choicepictured": "", "choicepicturee": "", "choicepicturef": "", "answer": "D", "solutionspicture1": "", "solutionspicture2": "", "solutionspicture3": "", "solutions": "The key to solve this question is that we do not know the relationship of $ X $ and $ Y $. $ X $ and $ Y $ may be independent or $ X = Y $, even $ X = -Y  $ in same speical case. So it is impossible to know the the distribution or the median of $ X - Y $ or $ X + Y $. However, we can know the mean of $ X + Y $. If the mean is finite, $ E[X-Y] = E[X]-E[Y]=0$. So the answer d is correct.\r\n<br>\r\nRemark: If you are still not sure even if you get correct answer, I suggest you think about whether a, b, c is wrong. Thinking about the counterexample will help you a lot.", "linkability1": 2.0, "linkability2": 1.0, "linkability3": 2.0, "linkability4": 0.0, "linkability5": 0.0, "linkability6": 0.0, "linkpersonaility": 0.0, "errors": "B", "alternativesolutions": "", "messagefailure": "Don't worry! Just try it again.  If you cannot exclude wrong answers, just choose the one which is most likely correct.", "messagesuccess": "Congratulations! You have correct answer on this little difficult question.", "sensitivity": 1.0, "gussingparameter": null, "difficulty": 2, "calculateddifficulty": null, "linkneuron": [31], "rightproblems": [], "wrongproblems": [], "twinproblems": []}}, {"model": "mathematics.question", "pk": 25, "fields": {"code": "0.5", "category": 5, "problem": "Toss a fair coin ten times. The chance there is neither consecutive heads nor consecutive tails is", "problempicture1": "", "problempicture2": "", "problempicture3": "", "problempicture4": "", "problempicture5": "", "problempicture6": "", "choicesa": "$ 2^{-1} $", "choicesb": "$ 2^{-5} $", "choicesc": "$ 2^{-9} $", "choicesd": "$ 2^{-10} $", "choicese": "None of the above is correct.", "choicesf": "", "choicepicturea": "", "choicepictureb": "", "choicepicturec": "", "choicepictured": "", "choicepicturee": "", "choicepicturef": "", "answer": "C", "solutionspicture1": "", "solutionspicture2": "", "solutionspicture3": "", "solutions": "First we count the number of total case. It is $ 2^{10} $. Then we count the number of case in which there is neither consecutive heads nor consecutive tails. We use H to stand for head and T to stand for tail. There are only $ 2 $ cases. It is \"HTHTHTHTHT\" and \"THTHTHTHTH\". So the chance is  $ 2/2^{10} $, which is $ 2^{-9} $. So the right answer is c.", "linkability1": 1.0, "linkability2": 2.0, "linkability3": 1.0, "linkability4": 0.0, "linkability5": 0.0, "linkability6": 0.0, "linkpersonaility": 0.0, "errors": "D", "alternativesolutions": "", "messagefailure": "Don't worry! Just try it again.", "messagesuccess": "Congratulations! You get the correct answer on this question.", "sensitivity": null, "gussingparameter": null, "difficulty": 1, "calculateddifficulty": null, "linkneuron": [23], "rightproblems": [], "wrongproblems": [], "twinproblems": []}}, {"model": "mathematics.question", "pk": 26, "fields": {"code": "0.6", "category": 5, "problem": "Two random variables have zero correlation. Then,", "problempicture1": "", "problempicture2": "", "problempicture3": "", "problempicture4": "", "problempicture5": "", "problempicture6": "", "choicesa": "They are independent.", "choicesb": "If they are normal random variables, they are independent.", "choicesc": "If they are Poisson random variables, they are independent.", "choicesd": "If they are random variables following uniform distributions, they are independent.", "choicese": "None of the above is correct.", "choicesf": "", "choicepicturea": "", "choicepictureb": "", "choicepicturec": "", "choicepictured": "", "choicepicturee": "", "choicepicturef": "", "answer": "B", "solutionspicture1": "", "solutionspicture2": "", "solutionspicture3": "", "solutions": "The zero correlation may not be independence. But the independence must be zero correlation. Only in some special case, the zero correlation means independence. The normal distribution has that feature. But Poisson distribution and uniform distribution do not have that feature.", "linkability1": 3.0, "linkability2": 0.0, "linkability3": 1.0, "linkability4": 0.0, "linkability5": 0.0, "linkability6": 0.0, "linkpersonaility": 0.0, "errors": "E", "alternativesolutions": "", "messagefailure": "Don't worry! Just try it again.", "messagesuccess": "Congratulations! You get the correct answer on this question.", "sensitivity": 1.0, "gussingparameter": null, "difficulty": 1, "calculateddifficulty": null, "linkneuron": [32, 33], "rightproblems": [], "wrongproblems": [], "twinproblems": []}}, {"model": "mathematics.question", "pk": 27, "fields": {"code": "0.7", "category": 5, "problem": "Let $ X = -10Y+10 $. Let $ r_1 $ be the correlation between $ X $ and $ Z $ and $ r_2 $ be the correlation between $ Y $ and $ Z $. Then,", "problempicture1": "", "problempicture2": "", "problempicture3": "", "problempicture4": "", "problempicture5": "", "problempicture6": "", "choicesa": "$ r_1 = r_2 $", "choicesb": "$ r_1 =10 r_2 $", "choicesc": "$ r_1 = -10r_2 $", "choicesd": "$ r_1 = -r_2 $", "choicese": "None of the above is correct.", "choicesf": "", "choicepicturea": "", "choicepictureb": "", "choicepicturec": "", "choicepictured": "", "choicepicturee": "", "choicepicturef": "", "answer": "D", "solutionspicture1": "", "solutionspicture2": "", "solutionspicture3": "", "solutions": "We should know how to calculate the correlation between two random variables.\r\n$$ r_{xy} =\\frac{E(X-EX)(Y-EY)}{\\sqrt{VarX VarY}}$$\r\nW.L.O.G. We assume that $ EY=0, EZ=0 $, so \r\n\\begin{eqnarray*}\r\nr_{xz}  &=& \\frac{E(-10YZ)}{\\sqrt{Var(10Y) VarZ}}\\\\\r\n&=&-\\frac{E(YZ)}{\\sqrt{VarY VarZ}}\\\\\r\n&=&-r_{yz}\r\n\\end{eqnarray*}\r\nSo $ r_1 = -r_2 $, which is answer d.\r\n<br>\r\nRemark: The assumption $ EY=0, EZ=0 $ does not affect the final answer. If you are not sure, you can prove it bu yourself. It will help you a lot.", "linkability1": 2.0, "linkability2": 2.0, "linkability3": 1.0, "linkability4": 0.0, "linkability5": 0.0, "linkability6": 0.0, "linkpersonaility": 0.0, "errors": "", "alternativesolutions": "C", "messagefailure": "Don't worry! Just try it again.", "messagesuccess": "Congratulations! You get the correct answer on this question.", "sensitivity": 1.0, "gussingparameter": null, "difficulty": 2, "calculateddifficulty": null, "linkneuron": [33], "rightproblems": [], "wrongproblems": [], "twinproblems": []}}, {"model": "mathematics.question", "pk": 28, "fields": {"code": "0.8", "category": 5, "problem": "The density of a random variabel $ X $ is $$f(x)  \\propto x^{-1/2} , x\\in [0,1]$$\r\nand $ f(x) = 0 $ for $ x \\notin [0,1] $. Here $\\propto$ means proporional to. Then, the mean of $ X $ is", "problempicture1": "", "problempicture2": "", "problempicture3": "", "problempicture4": "", "problempicture5": "", "problempicture6": "", "choicesa": "$ 1/2 $", "choicesb": "$ 1/\\sqrt{2} $", "choicesc": "$ 1/3 $", "choicesd": "$ 1/4 $", "choicese": "None of the above is correct.", "choicesf": "", "choicepicturea": "", "choicepictureb": "", "choicepicturec": "", "choicepictured": "", "choicepicturee": "", "choicepicturef": "", "answer": "C", "solutionspicture1": "", "solutionspicture2": "", "solutionspicture3": "", "solutions": "With the information in the question, we know that density function $ f(x) = Cx^{-1/2}, x\\in [0,1]$ with.\r\nSince $ \\int_{0}^{\\infty} f(x) dx=1$. So $ \\int_{0}^{1} Cx^{-1/2} dx=1$. So the $ C= 1/2 $.\r\n<br>\r\nNow we know the density function. We can calculate the expectation of X.\r\n$ EX = \\int_{0}^{1} f(x)x dx$ = $ \\int_{0}^{1} 1/2 \\cdot x^{-1/2} \\cdot x dx  $ = 1/3.\r\n<br>\r\nSo the right answer is (c).", "linkability1": 2.0, "linkability2": 2.0, "linkability3": 1.0, "linkability4": 0.0, "linkability5": 0.0, "linkability6": 0.0, "linkpersonaility": 0.0, "errors": "A", "alternativesolutions": "", "messagefailure": "Don't worry! Just try it again.", "messagesuccess": "Congratulations! You get the correct answer on this question.", "sensitivity": 1.0, "gussingparameter": null, "difficulty": 1, "calculateddifficulty": null, "linkneuron": [], "rightproblems": [], "wrongproblems": [], "twinproblems": []}}, {"model": "mathematics.question", "pk": 29, "fields": {"code": "0.9", "category": 5, "problem": "Toss a fair coin n times. Let $ S_n $ be the total number of heads. If $ n $ is large enough, then,", "problempicture1": "", "problempicture2": "", "problempicture3": "", "problempicture4": "", "problempicture5": "", "problempicture6": "", "choicesa": "$ S_n $ is close to the standard normal distribution.", "choicesb": "$ S_n $ is close to a Poisson distribution.", "choicesc": "$ S_n $ follows binomial distribution.", "choicesd": "$ S_n $ follows uniform distribution over integers $ 0,\\ldots,n. $", "choicese": "None of the above is correct.", "choicesf": "", "choicepicturea": "", "choicepictureb": "", "choicepicturec": "", "choicepictured": "", "choicepicturee": "", "choicepicturef": "", "answer": "C", "solutionspicture1": "", "solutionspicture2": "", "solutionspicture3": "", "solutions": "From the defintion of binomial distribution, it is easy to see that $ S_n $ follows binomial distribution.\r\n<br>\r\nRemark: Think about whether a, b are wrong.\r\n<br>\r\na. With central limit theorem, $ \\frac{S_n - \\frac{1}{2}n}{\\sqrt{n/4}}$ is close to standard normal distribution. Not  $ S_n $ is close to the standard normal distribution.\r\n<br>\r\nb. Poisson approximation only holds on the assumption that $ p $ is very small. Here $ p=1/2 $.", "linkability1": 2.0, "linkability2": 0.0, "linkability3": 1.0, "linkability4": 0.0, "linkability5": 0.0, "linkability6": 0.0, "linkpersonaility": 0.0, "errors": "A or B", "alternativesolutions": "", "messagefailure": "Don't worry! Just try it again.", "messagesuccess": "Congratulations! You get the correct answer on this question.", "sensitivity": 1.0, "gussingparameter": null, "difficulty": 2, "calculateddifficulty": null, "linkneuron": [29], "rightproblems": [], "wrongproblems": [], "twinproblems": []}}, {"model": "mathematics.question", "pk": 30, "fields": {"code": "0.10", "category": 5, "problem": "Suppose $ P(|X|<1) = 1$ and $ P(|Y| =2) = 1 $. Then,", "problempicture1": "", "problempicture2": "", "problempicture3": "", "problempicture4": "", "problempicture5": "", "problempicture6": "", "choicesa": "The standard deviation of $ X $ is smaller than that of $ Y $.", "choicesb": "The mean of $ X $ is smaller than that of $ Y $.", "choicesc": "The variance of $ X $ is larger than that of $ Y $.", "choicesd": "The median of $ X $ is equal to the median of $ Y $.", "choicese": "None of the above is correct.", "choicesf": "", "choicepicturea": "", "choicepictureb": "", "choicepicturec": "", "choicepictured": "", "choicepicturee": "", "choicepicturef": "", "answer": "E", "solutionspicture1": "", "solutionspicture2": "", "solutionspicture3": "", "solutions": "It is not easy question. We need to check them one by one.\r\n<br>\r\na. We choose $ Y = 2 $. So the standard deviation of $ Y $ is 0.\r\n<br>\r\nb. We choose $ P(Y=2)=1/2 $ and $P(Y=-2)=1/2 $. And we choose $ P(X>0) =1 $. So the mean of $ X $ is smaller than that of $ Y $, which is 0 here.\r\n<br>\r\nc. We choose $ X = 1/2 $. So $ Var(X) = 0 $.\r\n<br>\r\nd. We choose the case in a. The median of $ Y $ is 2. But the meidian of $ X$ is smaller than 1.", "linkability1": 3.0, "linkability2": 0.0, "linkability3": 2.0, "linkability4": 1.0, "linkability5": 0.0, "linkability6": 0.0, "linkpersonaility": 0.0, "errors": "A, B, C or D", "alternativesolutions": "", "messagefailure": "Don't worry! Just try it again.", "messagesuccess": "Congratulations! You get the correct answer on this question. And you have finished the part of quiz 0.", "sensitivity": 1.0, "gussingparameter": null, "difficulty": 3, "calculateddifficulty": null, "linkneuron": [31], "rightproblems": [], "wrongproblems": [], "twinproblems": []}}]
export default data;