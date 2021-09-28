UPDATE public."Session"
SET name='Gradual typing for Python 3', summarization='Traditionally, types have been handled by the Python interpreter in a flexible but implicit way. Recent versions of Python allow you to specify explicit type hints that can be used by different tools to help you develop your code more efficiently.'
WHERE session_id = 1;

UPDATE public."Session"
SET name='C++ 2006-2020', summarization= 'From 2006 to 2020, the C++ developer community grew from about 3 million to about 4.5 million. It was a period where new programming models emerged, hardware architectures evolved, new application domains gained massive importance, and quite a few well-financed and professionally-marketed languages fought for dominance. How did C++ -- an older language without serious commercial backing -- manage to thrive in the face of all that?'
WHERE session_id = 2;

UPDATE public."Session"
SET name='Amazon Coretto announce', summarization='Amazon Corretto is a no-cost, multiplatform, production-ready distribution of the Open Java Development Kit (OpenJDK). Corretto comes with long-term support that will include performance enhancements and security fixes. Amazon runs Corretto internally on thousands of production services and Corretto is certified as compatible with the Java SE standard. With Corretto, you can develop and run Java applications on popular operating systems, including Linux, Windows, and macOS'
WHERE session_id = 3;
