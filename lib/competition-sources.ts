export type CompetitionSource = {
  officialUrl: string;
  scheduleUrl?: string;
  githubQuery: string;
  overview: string;
};

export const competitionSources: Record<string, CompetitionSource> = {
  "siemens-cup": { officialUrl: "https://www.siemenscup-cimc.org.cn/", scheduleUrl: "https://www.siemenscup-cimc.org.cn/competition/index", githubQuery: "西门子杯 智能制造", overview: "赛事面向智能制造领域工程人才培养与选拔，内容涉及智能软硬件工具、智能产品、工厂自动化控制、工业网络和全生命周期数字化。参赛者需要把控制、建模、软件和工程实施能力用于真实或近真实的制造问题。" },
  "china-software-cup": { officialUrl: "https://www.cnsoftbei.com/", githubQuery: "中国软件杯", overview: "大赛由政府部门指导、企业命题、高校参与，赛题来自软件与信息技术产业实际需求。作品通常需要完成需求分析、系统设计、软件实现、文档和现场展示，强调工程完成度与创新应用。" },
  "challenge-cup": { officialUrl: "https://www.tiaozhanbei.net/", githubQuery: "挑战杯 创业计划", overview: "“挑战杯”中国大学生创业计划竞赛是“挑战杯”系列赛事之一，围绕创新、协调、绿色、开放、共享的发展理念组织项目。团队需要从社会需求或科研成果出发，形成兼顾创新性、可行性和社会价值的创业计划。" },
  "acm-icpc": { officialUrl: "https://icpc.global/", githubQuery: "ICPC solutions", overview: "ICPC 是面向大学生的团队程序设计竞赛。三名队员协作分析算法问题，在限定时间内编写并提交程序，成绩综合考虑解题数量和罚时，重点考察算法、数据结构、编码正确性和团队配合。" },
  "huawei-ict": { officialUrl: "https://e.huawei.com/cn/talent/ict-academy/#/ict-contest", githubQuery: "Huawei ICT Competition", overview: "华为 ICT 大赛面向全球高校学生，提供国际化竞技与交流平台。赛事覆盖网络、云、基础软件、人工智能等方向，注重 ICT 理论知识、上机实践、工程创新和团队合作。" },
  "lanqiao-cup": { officialUrl: "https://dasai.lanqiao.cn/", githubQuery: "蓝桥杯 题解", overview: "蓝桥杯设置软件、电子等多个竞赛方向，既包含限时程序设计，也包含嵌入式与电子系统实践。对初次接触学科竞赛的同学而言，它适合作为检验编程基础、算法思维或软硬件实践能力的入口。" },
  "mcm-icm": { officialUrl: "https://contest.comap.com/undergraduate/contests/mcm/", githubQuery: "MCM ICM modeling", overview: "MCM/ICM 由 COMAP 主办，团队需要在连续竞赛时间内从开放问题中选择一题，完成问题分析、数学建模、计算实验和英文论文。赛事强调把数学方法用于现实问题，并清晰说明假设、模型、验证和结论。" },
  "innovation-annual": { officialUrl: "http://gjcxcy.bjtu.edu.cn/", githubQuery: "大学生创新创业训练计划 项目", overview: "年会展示集中交流国家级大学生创新创业训练计划中的优秀项目，通常包含学术论文、改革成果和创业推介等展示形式。它更重视项目的长期积累、研究过程、创新价值与表达能力。" },
  "robot-competition": { officialUrl: "https://www.robomaster.com/", githubQuery: "RoboMaster robot", overview: "全国大学生机器人大赛包含 RoboMaster、RoboCon 等赛事体系。参赛团队通常需要长期协作，完成机械、电控、嵌入式、视觉、导航、算法和运营等工作，是综合性很强的工程实践平台。" },
  "computer-system": { officialUrl: "https://os.educg.net/", githubQuery: "全国大学生计算机系统能力大赛", overview: "大赛围绕操作系统、编译系统、计算机系统设计、芯片等底层技术设置赛项，鼓励学生理解软硬件协同工作的原理。作品和答辩通常重视系统正确性、性能、设计取舍和工程文档。" },
  "transport-tech": { officialUrl: "https://www.nactrans.com.cn/", githubQuery: "交通运输科技大赛", overview: "赛事面向交通运输相关专业及交叉学科学生，鼓励围绕综合交通、智慧交通、道路铁路、水运航空等场景提出创新方案。项目需要体现明确的问题背景、技术方法、验证过程和应用价值。" },
  "embedded-chip": { officialUrl: "http://www.socchina.net/", githubQuery: "全国大学生嵌入式芯片 系统设计", overview: "竞赛以国产及产业芯片平台为基础，考察嵌入式软硬件系统的设计与实现。参赛团队通常需要完成硬件连接、驱动开发、算法部署、系统调试、作品文档与现场演示。" },
  "cn-math-modeling": { officialUrl: "https://www.mcm.edu.cn/", githubQuery: "全国大学生数学建模竞赛", overview: "全国大学生数学建模竞赛要求三人团队在规定时间内完成开放问题的建模、求解、验证与论文写作。题目来源广泛，重点不是套用固定算法，而是建立合理假设并用清晰证据支撑结论。" },
  "statistics-modeling": { officialUrl: "http://tjjmds.ai-learning.net/", githubQuery: "全国大学生统计建模大赛", overview: "统计建模大赛鼓励学生关注经济社会与科学技术中的真实数据问题，运用统计理论、数据分析和可视化形成研究成果。项目需要兼顾问题价值、方法合理性、结果解释与论文规范。" },
  "information-security": { officialUrl: "https://www.ciscn.cn/", githubQuery: "全国大学生信息安全竞赛", overview: "全国大学生信息安全竞赛通过创新实践与能力赛等形式培养网络空间安全人才。不同赛项会涉及密码学、系统安全、网络攻防、漏洞分析、软件开发和安全创新应用。" },
  "security-confrontation": { officialUrl: "http://www.isclab.org.cn/", githubQuery: "信息安全与对抗技术竞赛", overview: "赛事关注信息安全与对抗技术的学习和实践，题目可能覆盖网络攻防、系统安全、密码应用和创新作品。参赛者应在合法授权的竞赛环境中训练，并严格遵守网络安全和学术诚信要求。" },
  "smart-car": { officialUrl: "https://smartcar.cdstm.cn/", githubQuery: "全国大学生智能汽车竞赛", overview: "全国大学生智能汽车竞赛以自主运行车辆为核心载体，融合传感器、嵌入式开发、控制算法、计算机视觉和机械结构。各组别规则与平台逐年变化，需要围绕当届技术文件进行方案设计和反复调试。" },
  "ai-algorithm": { officialUrl: "https://www.aicomp.cn/", githubQuery: "人工智能算法精英大赛", overview: "赛事围绕人工智能算法与产业应用设置命题，常见任务涉及机器学习、计算机视觉、自然语言处理和数据挖掘。评价通常关注模型效果、方法创新、可复现性以及对实际问题的解释。" },
  "raicom": { officialUrl: "https://www.robocom.com.cn/", githubQuery: "RAICOM 睿抗 机器人", overview: "睿抗机器人开发者大赛通过机器人、编程和人工智能相关赛项培养工程实践能力。不同赛道对硬件平台、任务环境和提交形式要求不同，应从当届命题文件确认设备与技术边界。" },
  "future-designer": { officialUrl: "https://www.ncda.org.cn/", githubQuery: "未来设计师 NCDA", overview: "未来设计师大赛面向数字艺术与设计创新，覆盖视觉传达、数字媒体、交互、动画、空间与跨学科应用等方向。作品需要在创意表达之外说明设计目标、过程、媒介选择和社会价值。" },
  "apmcm": { officialUrl: "https://www.apmcm.org/", githubQuery: "APMCM 亚太 数学建模", overview: "亚太地区大学生数学建模竞赛以开放问题推动团队综合运用数学、计算和写作能力。参赛者需要在有限时间内完成模型构建、程序实验、敏感性或误差分析，并提交结构完整的论文。" },
  "mechanical-innovation": { officialUrl: "http://www.gczbds.org/", githubQuery: "中国大学生机械工程创新创意大赛", overview: "大赛由机械工程领域多个专业赛项共同构成，强调机械设计、制造实践和工程创新。具体赛项可能涉及过程装备、材料、铸造、智能制造等方向，参赛前应确认所属分赛项规则。" },
  "computer-design": { officialUrl: "https://jsjds.blcu.edu.cn/", githubQuery: "中国大学生计算机设计大赛", overview: "中国大学生计算机设计大赛覆盖软件应用、人工智能、物联网、信息可视化、数字媒体等类别。作品既要满足分类规则，也要通过技术实现、内容表达和现场答辩展示完整设计过程。" },
  "college-computer": { officialUrl: "https://www.c4best.cn/", githubQuery: "中国高校计算机大赛", overview: "中国高校计算机大赛包含大数据挑战、团体程序设计天梯赛、移动应用创新、网络技术挑战和人工智能创意等赛事。各赛道由不同单位组织，时间、组队和提交要求需分别核对。" },
  "robot-creative": { officialUrl: "http://www.robotcontest.cn/", githubQuery: "中国高校智能机器人创意大赛", overview: "赛事鼓励高校学生围绕智能机器人提出创意并完成可展示的系统作品，综合考察机械结构、控制、感知、人工智能与交互设计。不同主题赛道会指定场景或平台。" },
  "robocup-china": { officialUrl: "http://crc.drct-caa.org.cn/", githubQuery: "RoboCup China robot", overview: "中国机器人大赛暨 RoboCup 机器人世界杯中国赛设置机器人足球、服务、救援等多个项目，强调自主智能系统在标准环境中的表现。团队需根据项目规则完成软硬件系统集成和长期测试。" },
  "robot-ai": { officialUrl: "https://www.caairobot.com/", githubQuery: "中国机器人及人工智能大赛", overview: "中国机器人及人工智能大赛围绕机器人与人工智能技术的融合应用设置多类赛项。任务可能涉及视觉识别、导航控制、智能交互和创新设计，具体平台及评价指标以当届规程为准。" },
  "china-us-maker": { officialUrl: "https://chinaus-maker.cscse.edu.cn/", githubQuery: "中美青年创客大赛", overview: "中美青年创客大赛鼓励青年团队围绕可持续发展、社区、教育、健康等议题开展创客实践。项目重视跨学科协作、原型实现、创新价值和用清晰故事表达解决方案。" },
  "guangdong-ai-transport": { officialUrl: "https://td.gd.gov.cn/", githubQuery: "AI 交通运输 创新应用", overview: "赛事聚焦人工智能与交通运输场景的融合，鼓励参赛者针对规划、建设、运营、安全或服务问题提出可落地方案。该赛事动态信息目前以广东省交通运输主管部门发布的正式通知为核验入口。" }
};
