import React from "react";
import { getFallbacks, updateFallbacks } from "@/lib/fallbacks";


const resumePdf = '/pdfs/CV_Md._Monowarul_Islam.pdf'

async function getProblemCounts() {
    const { FALLBACK_CF, FALLBACK_LC } = getFallbacks();
    let cfCount = FALLBACK_CF;
    let lcCount = FALLBACK_LC;
    
    const fetchWithTimeout = async (url: string, options: RequestInit & { timeout?: number } = {}) => {
        const { timeout = 3000, ...fetchOptions } = options;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        
        try {
            const response = await fetch(url, {
                ...fetchOptions,
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            return response;
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    };

    try {
        const [cfRes, lcRes] = await Promise.allSettled([
            fetchWithTimeout('https://codeforces.com/api/user.status?handle=xordan.-', {
                next: { revalidate: 600 },
                headers: { 'User-Agent': 'portfolio/1.0' },
                timeout: 3000
            }),
            fetchWithTimeout('https://leetcode.com/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: `query getUserProfile($username: String!) {
                        matchedUser(username: $username) {
                            submitStats {
                                acSubmissionNum {
                                    difficulty
                                    count
                                }
                            }
                        }
                    }`,
                    variables: { username: 'xordan77' }
                }),
                next: { revalidate: 600 },
                timeout: 3000
            })
        ]);

        let cfCount = FALLBACK_CF;
        let lcCount = FALLBACK_LC;

        // Handle Codeforces
        if (cfRes.status === 'fulfilled' && cfRes.value.ok) {
            try {
                const cfData = await cfRes.value.json();
                if (cfData.status === 'OK' && Array.isArray(cfData.result)) {
                    const solved = new Set<string>();
                    for (const sub of cfData.result) {
                        if (sub.verdict === 'OK' && sub.problem) {
                            solved.add(`${sub.problem.contestId}${sub.problem.index}`);
                        }
                    }
                    if (solved.size > 0)
                        cfCount = solved.size;
                        updateFallbacks({ FALLBACK_CF: cfCount });
                }
            } catch (e) {
                console.warn('Failed to parse Codeforces data:', e);
            }
        } else {
            console.warn('Codeforces fetch failed, using fallback:', FALLBACK_CF);
        }

        // Handle LeetCode
        if (lcRes.status === 'fulfilled' && lcRes.value.ok) {
            try {
                const lcData = await lcRes.value.json();
                const stats = lcData?.data?.matchedUser?.submitStats?.acSubmissionNum;
                if (Array.isArray(stats)) {
                    const total = stats.find((x: any) => x.difficulty === 'All')?.count;
                    if (typeof total === 'number' && total > 0)
                        lcCount = total;
                        updateFallbacks({ FALLBACK_LC: lcCount });
                }
            } catch (e) {
                console.warn('Failed to parse LeetCode data:', e);
            }
        } else {
            console.warn('LeetCode fetch failed, using fallback:', FALLBACK_LC);
        }

        return { cfCount, lcCount };
    } catch (error) {
        console.error('Error fetching problem counts:', error);
        return { cfCount: FALLBACK_CF, lcCount: FALLBACK_LC };
    }
}

export default async function AboutMe() {
    const { cfCount, lcCount } = await getProblemCounts();
    
    return (
        <section id="aboutme" className="section">
            <h2>About Me</h2>
            <div className="card">
                <p>
                    Hello there! This is <strong>Monowarul Islam</strong>, you can also call me <strong>Shraban</strong>.
                    I am a Computer Science graduate from <a href="https://bracu.ac.bd" className="ab_link" target="_blank">
                        Brac University</a>, awaiting conferral. I enjoy programming challenges,
                    and have solved <a className="ab_link" href="/cfsolves">{cfCount} problems on Codeforces</a><span> </span>
                    and <a href="https://leetcode.com/u/xordan77/" className="ab_link" target="_blank">{lcCount} problems on LeetCode</a>.
                    On the academic side, my research interests include data science, machine learning and deep
                    learning. I have also gained experience by working on projects which required me to study
                    about <strong>Machine Learning</strong> (<i>Scikit-Learn, TensorFlow</i>), <strong>Robotics</strong> (<i>ESP32, Arduino Uno, C++</i>) and
                    <strong> Web Development</strong> (<i>PHP, HTML, CSS</i>). Recently, I have defended my undergrad thesis
                    which was a research project on Cyber-Security that incorporated machine learning based
                    intrusion detection with traditional solutions. My research role included optimizing ML models, handling
                    large datasets and implementing the ML algorithms to produce optimal results. Currently, I am working on
                    furthering the research works from the thesis. Alongside that, I am also looking for opportunities to gain
                    industry experience and implement my skills in the real world environment. You can find my <strong>resume</strong> <a
                        className="ab_link"
                        href={resumePdf} target="_blank">here</a>.
                </p>
                <p>
                    On my free time, I enjoy playing video games, solving programming problems, watching movies, TV series and
                    anime. Some of my favorites are <span> </span>
                    <a href="https://www.imdb.com/title/tt6161168/" className="as_link" target="_blank">Red Dead
                        Redemption II</a>,<span> </span>
                    <a href="https://www.imdb.com/title/tt0111161/" className="as_link" target="_blank">The
                        Shawshank Redemption</a>,<span> </span>
                    <a href="https://www.imdb.com/title/tt0903747/" className="as_link" target="_blank">Breaking
                        Bad</a> and <span> </span>
                    <a href="https://www.imdb.com/title/tt0434706/" className="as_link" target="_blank">Monster</a>.
                </p>
            </div>
        </section>
    )
}