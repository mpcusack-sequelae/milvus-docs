---
id: with-iterators.md
order: 4
summary: Milvus provides search and query iterators for iterating results with a large volume of entities.
title: With Iterators
---

<h1 id="With-Iterators" class="common-anchor-header">With Iterators
    <button data-href="#With-Iterators" class="anchor-icon">
      <svg
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p>Milvus provides search and query iterators for iterating results with a large volume of entities. Since Milvus limits TopK to 16384, users can use iterators to return large numbers or even whole entities in a collection in batch mode.</p>
<h2 id="Overview" class="common-anchor-header">Overview
    <button data-href="#Overview" class="anchor-icon">
      <svg
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Iterators are powerful tools that help you iterate through a large volume of or all data within a collection using primary key values and Boolean expressions. This can significantly improve the way you retrieve data. Unlike the traditional use of <strong>offset</strong> and <strong>limit</strong> parameters, which may become less efficient over time, iterators offer a more scalable solution.</p>
<h3 id="Benefits-of-using-iterators" class="common-anchor-header">Benefits of using iterators</h3><ul>
<li><p><strong>Simplicity</strong>: Eliminates the complex <strong>offset</strong> and <strong>limit</strong> settings.</p></li>
<li><p><strong>Efficiency</strong>: Provides scalable data retrieval by fetching only the data in need.</p></li>
<li><p><strong>Consistency</strong>: Ensures a consistent dataset size with boolean filters.</p></li>
</ul>
<div class="admonition note">
<p><b>notes</b></p>
<ul>
<li>This feature is available for Milvus 2.3.x or later.</li>
</ul>
</div>
<h2 id="Preparations" class="common-anchor-header">Preparations
    <button data-href="#Preparations" class="anchor-icon">
      <svg
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>The following steps repurpose the code to connect to Milvus, quickly set up a collection, and insert over 10,000 randomly generated entities into the collection.</p>
<h3 id="Step-1-Create-a-collection" class="common-anchor-header">Step 1: Create a collection</h3><div class="language-python">
<p>Use <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md"><code>MilvusClient</code></a> to connect to the Milvus server and <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md"><code>create_collection()</code></a> to create a collection.</p>
</div>
<div class="language-java">
<p>Use <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Client/MilvusClientV2.md"><code>MilvusClientV2</code></a> to connect to the Milvus server and <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md"><code>createCollection()</code></a> to create a collection.</p>
</div>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
</div>
<pre><code class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># 1. Set up a Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
)

<span class="hljs-comment"># 2. Create a collection</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    dimension=<span class="hljs-number">5</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code class="language-java"><span class="hljs-keyword">import</span> io.milvus.client.MilvusServiceClient;
<span class="hljs-keyword">import</span> io.milvus.param.ConnectParam;
<span class="hljs-keyword">import</span> io.milvus.param.highlevel.collection.CreateSimpleCollectionParam;

<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectParam</span> <span class="hljs-variable">connectParam</span> <span class="hljs-operator">=</span> ConnectParam.newBuilder()
        .withUri(CLUSTER_ENDPOINT)
        .build();

<span class="hljs-type">MilvusServiceClient</span> <span class="hljs-variable">client</span>  <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusServiceClient</span>(connectParam);

<span class="hljs-comment">// 2. Create a collection</span>
<span class="hljs-type">CreateSimpleCollectionParam</span> <span class="hljs-variable">createCollectionParam</span> <span class="hljs-operator">=</span> CreateSimpleCollectionParam.newBuilder()
        .withCollectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .withDimension(<span class="hljs-number">5</span>)
        .build();

client.createCollection(createCollectionParam);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Insert-randomly-generated-entities" class="common-anchor-header">Step 2: Insert randomly generated entities</h3><div class="language-python">
<p>Use <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md"><code>insert()</code></a> to insert entities into the collection.</p>
</div>
<div class="language-java">
<p>Use <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Vector/insert.md"><code>insert()</code></a> to insert entities into the collection.</p>
</div>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
</div>
<pre><code class="language-python"><span class="hljs-comment"># 3. Insert randomly generated vectors </span>
colors = [<span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;yellow&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-string">&quot;white&quot;</span>, <span class="hljs-string">&quot;purple&quot;</span>, <span class="hljs-string">&quot;pink&quot;</span>, <span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-string">&quot;brown&quot;</span>, <span class="hljs-string">&quot;grey&quot;</span>]
data = []

<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">10000</span>):
    current_color = random.choice(colors)
    current_tag = random.randint(<span class="hljs-number">1000</span>, <span class="hljs-number">9999</span>)
    data.append({
        <span class="hljs-string">&quot;id&quot;</span>: i,
        <span class="hljs-string">&quot;vector&quot;</span>: [ random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ],
        <span class="hljs-string">&quot;color&quot;</span>: current_color,
        <span class="hljs-string">&quot;tag&quot;</span>: current_tag,
        <span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">f&quot;<span class="hljs-subst">{current_color}</span>_<span class="hljs-subst">{<span class="hljs-built_in">str</span>(current_tag)}</span>&quot;</span>
    })

<span class="hljs-built_in">print</span>(data[<span class="hljs-number">0</span>])

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;id&quot;: 0,</span>
<span class="hljs-comment">#     &quot;vector&quot;: [</span>
<span class="hljs-comment">#         -0.5705990742218152,</span>
<span class="hljs-comment">#         0.39844925120642083,</span>
<span class="hljs-comment">#         -0.8791287928610869,</span>
<span class="hljs-comment">#         0.024163154953680932,</span>
<span class="hljs-comment">#         0.6837669917169638</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;color&quot;: &quot;purple&quot;,</span>
<span class="hljs-comment">#     &quot;tag&quot;: 7774,</span>
<span class="hljs-comment">#     &quot;color_tag&quot;: &quot;purple_7774&quot;</span>
<span class="hljs-comment"># }</span>

res = client.insert(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    data=data,
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;insert_count&quot;: 10000,</span>
<span class="hljs-comment">#     &quot;ids&quot;: [</span>
<span class="hljs-comment">#         0,</span>
<span class="hljs-comment">#         1,</span>
<span class="hljs-comment">#         2,</span>
<span class="hljs-comment">#         3,</span>
<span class="hljs-comment">#         4,</span>
<span class="hljs-comment">#         5,</span>
<span class="hljs-comment">#         6,</span>
<span class="hljs-comment">#         7,</span>
<span class="hljs-comment">#         8,</span>
<span class="hljs-comment">#         9,</span>
<span class="hljs-comment">#         &quot;(9990 more items hidden)&quot;</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Random;

<span class="hljs-keyword">import</span> com.alibaba.fastjson.JSONObject;

<span class="hljs-keyword">import</span> io.milvus.param.R;
<span class="hljs-keyword">import</span> io.milvus.param.dml.InsertParam;
<span class="hljs-keyword">import</span> io.milvus.response.MutationResultWrapper;
<span class="hljs-keyword">import</span> io.milvus.grpc.MutationResult;


<span class="hljs-comment">// 3. Insert randomly generated vectors into the collection</span>
List&lt;String&gt; colors = Arrays.asList(<span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;yellow&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-string">&quot;white&quot;</span>, <span class="hljs-string">&quot;purple&quot;</span>, <span class="hljs-string">&quot;pink&quot;</span>, <span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-string">&quot;brown&quot;</span>, <span class="hljs-string">&quot;grey&quot;</span>);
List&lt;JSONObject&gt; data = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();

<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> i=<span class="hljs-number">0</span>; i&lt;<span class="hljs-number">10000</span>; i++) {
    <span class="hljs-type">Random</span> <span class="hljs-variable">rand</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();
    <span class="hljs-type">String</span> <span class="hljs-variable">current_color</span> <span class="hljs-operator">=</span> colors.get(rand.nextInt(colors.size()-<span class="hljs-number">1</span>));
    <span class="hljs-type">JSONObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSONObject</span>();
    row.put(<span class="hljs-string">&quot;id&quot;</span>, Long.valueOf(i));
    row.put(<span class="hljs-string">&quot;vector&quot;</span>, Arrays.asList(rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat()));
    row.put(<span class="hljs-string">&quot;color_tag&quot;</span>, current_color + <span class="hljs-string">&quot;_&quot;</span> + String.valueOf(rand.nextInt(<span class="hljs-number">8999</span>) + <span class="hljs-number">1000</span>));
    data.add(row);
}

<span class="hljs-type">InsertParam</span> <span class="hljs-variable">insertParam</span> <span class="hljs-operator">=</span> InsertParam.newBuilder()
    .withCollectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .withRows(data)
    .build();

R&lt;MutationResult&gt; insertRes = client.insert(insertParam);

<span class="hljs-keyword">if</span> (insertRes.getStatus() != R.Status.Success.getCode()) {
    System.err.println(insertRes.getMessage());
}

<span class="hljs-type">MutationResultWrapper</span> <span class="hljs-variable">wrapper</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MutationResultWrapper</span>(insertRes.getData());
System.out.println(wrapper.getInsertCount());
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search-with-iterator" class="common-anchor-header">Search with iterator
    <button data-href="#Search-with-iterator" class="anchor-icon">
      <svg
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Iterators make similarity searches more scalable.</p>
<div class="language-python">
<p>To search with an iterator, call the <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/search_iterator.md">search_iterator()</a> method:</p>
</div>
<div class="language-java">
<p>To search with an iterator, call the <a href="https://milvus.io/api-reference/java/v2.4.x/v1/QuerySearch/searchIterator.md">searchIterator()</a> method:</p>
</div>
<ol>
<li><p>Initialize the search iterator to define the search parameters and output fields.</p></li>
<li><p>Use the <strong>next()</strong> method within a loop to paginate through the search results.</p>
<ul>
<li><p>If the method returns an empty array, the loop ends, and no more pages are available.</p></li>
<li><p>All results carry the specified output fields.</p></li>
</ul></li>
<li><p>Manually call the <strong>close()</strong> method to close the iterator once all data has been retrieved.</p></li>
</ol>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
</div>
<pre><code class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection

<span class="hljs-comment"># 4. Search with iterator</span>
connections.connect(host=<span class="hljs-string">&quot;127.0.0.1&quot;</span>, port=<span class="hljs-number">19530</span>)
collection = Collection(<span class="hljs-string">&quot;quick_setup&quot;</span>)

query_vectors = [[<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]]
search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
}

iterator = collection.search_iterator(
    data=query_vectors,
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    batch_size=<span class="hljs-number">10</span>,
    param=search_params,
    output_fields=[<span class="hljs-string">&quot;color_tag&quot;</span>],
    limit=<span class="hljs-number">3</span>
)

results = []

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    result = iterator.<span class="hljs-built_in">next</span>()
    <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> result:
        iterator.close()
        <span class="hljs-keyword">break</span>
        
    results.extend(result)
    
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> result:
        results.append(hit.to_dict())

<span class="hljs-built_in">print</span>(results)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;id&quot;: 1756,</span>
<span class="hljs-comment">#         &quot;distance&quot;: 2.0642056465148926,</span>
<span class="hljs-comment">#         &quot;entity&quot;: {</span>
<span class="hljs-comment">#             &quot;color_tag&quot;: &quot;black_9109&quot;</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;id&quot;: 6488,</span>
<span class="hljs-comment">#         &quot;distance&quot;: 1.9437453746795654,</span>
<span class="hljs-comment">#         &quot;entity&quot;: {</span>
<span class="hljs-comment">#             &quot;color_tag&quot;: &quot;purple_8164&quot;</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;id&quot;: 3338,</span>
<span class="hljs-comment">#         &quot;distance&quot;: 1.9107104539871216,</span>
<span class="hljs-comment">#         &quot;entity&quot;: {</span>
<span class="hljs-comment">#             &quot;color_tag&quot;: &quot;brown_8121&quot;</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code class="language-java"><span class="hljs-keyword">import</span> io.milvus.param.dml.QueryIteratorParam;
<span class="hljs-keyword">import</span> io.milvus.param.dml.SearchIteratorParam;
<span class="hljs-keyword">import</span> io.milvus.response.QueryResultsWrapper;
<span class="hljs-keyword">import</span> io.milvus.orm.iterator.SearchIterator;

<span class="hljs-comment">// 4. Search with iterators</span>
<span class="hljs-type">SearchIteratorParam</span> <span class="hljs-variable">iteratorParam</span> <span class="hljs-operator">=</span> SearchIteratorParam.newBuilder()
    .withCollectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .withVectorFieldName(<span class="hljs-string">&quot;vector&quot;</span>)
    <span class="hljs-comment">// Use withFloatVectors() in clusters compatible with Milvus 2.4.x</span>
    .withVectors(Arrays.asList(<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, -<span class="hljs-number">0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>))
    .withBatchSize(<span class="hljs-number">10L</span>)
    .withParams(<span class="hljs-string">&quot;{\&quot;metric_type\&quot;: \&quot;COSINE\&quot;, \&quot;params\&quot;: {\&quot;level\&quot;: 1}}&quot;</span>)
    .build();
        

R&lt;SearchIterator&gt; searchIteratorRes = client.searchIterator(iteratorParam);

<span class="hljs-keyword">if</span> (searchIteratorRes.getStatus() != R.Status.Success.getCode()) {
    System.err.println(searchIteratorRes.getMessage());
}

<span class="hljs-type">SearchIterator</span> <span class="hljs-variable">searchIterator</span> <span class="hljs-operator">=</span> searchIteratorRes.getData();
List&lt;QueryResultsWrapper.RowRecord&gt; results = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();

<span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
    List&lt;QueryResultsWrapper.RowRecord&gt; batchResults = searchIterator.next();
    <span class="hljs-keyword">if</span> (batchResults.isEmpty()) {
        searchIterator.close();
        <span class="hljs-keyword">break</span>;
    }
    <span class="hljs-keyword">for</span> (QueryResultsWrapper.RowRecord rowRecord : batchResults) {
        results.add(rowRecord);
    }
}

System.out.println(results.size());
<button class="copy-code-btn"></button></code></pre>
<table class="language-python">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>data</code></td>
      <td>A list of vector embeddings.<br/>Milvus searches for the most similar vector embeddings to the specified ones.</td>
    </tr>
    <tr>
      <td><code>anns_field</code></td>
      <td>The name of the vector field in the current collection.</td>
    </tr>
    <tr>
      <td><code>batch_size</code></td>
      <td>The number of entities to return each time you call <code>next()</code> on the current iterator.<br/>The value defaults to <strong>1000</strong>. Set it to a proper value to control the number of entities to return per iteration.</td>
    </tr>
    <tr>
      <td><code>param</code></td>
      <td>The parameter settings specific to this operation.<br/><ul><li><code>metric_type</code>: The metric type applied to this operation. This should be the same as the one used when you index the vector field specified above. Possible values are <strong>L2</strong>, <strong>IP</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>.</li><li><code>params</code>: Additional parameters. For details, refer to <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/search_iterator.md">search_iterator()</a>.</li></ul></td>
    </tr>
    <tr>
      <td><code>output_fields</code></td>
      <td>A list of field names to include in each entity in return.<br/>The value defaults to <strong>None</strong>. If left unspecified, only the primary field is included.</td>
    </tr>
    <tr>
      <td><code>limit</code></td>
      <td>The total number of entities to return.<br/>The value defaults to <strong>-1</strong>, indicating all matching entities will be in return.</td>
    </tr>
  </tbody>
</table>
<table class="language-java">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>withCollectionName</code></td>
      <td>Set the collection name. Collection name cannot be empty or null.</td>
    </tr>
    <tr>
      <td><code>withVectorFieldName</code></td>
      <td>Set target vector field by name. Field name cannot be empty or null.</td>
    </tr>
    <tr>
      <td><code>withVectors</code></td>
      <td>Set the target vectors. Up to 16384 vectors allowed.</td>
    </tr>
    <tr>
      <td><code>withBatchSize</code></td>
      <td>The number of entities to return each time you call <code>next()</code> on the current iterator.<br/>The value defaults to <strong>1000</strong>. Set it to a proper value to control the number of entities to return per iteration.</td>
    </tr>
    <tr>
      <td><code>withParams</code></td>
      <td>Specifies the parameters of search in JSON format. For more information, refer to <a href="https://milvus.io/api-reference/java/v2.4.x/v1/QuerySearch/searchIterator.md">searchIterator()</a>.</td>
    </tr>
  </tbody>
</table>
<h2 id="Query-with-an-iterator" class="common-anchor-header">Query with an iterator
    <button data-href="#Query-with-an-iterator" class="anchor-icon">
      <svg
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><div class="language-python">
<p>To query with an iterator, call the <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/query_iterator.md">query_iterator()</a> method:</p>
</div>
<div class="language-java">
<p>To search with an iterator, call the <a href="https://milvus.io/api-reference/java/v2.4.x/v1/QuerySearch/queryIterator.md">queryIterator()</a> method:</p>
</div>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
</div>
<pre><code class="language-python"><span class="hljs-comment"># 6. Query with iterator</span>
iterator = collection.query_iterator(
    batch_size=<span class="hljs-number">10</span>, <span class="hljs-comment"># Controls the size of the return each time you call next()</span>
    expr=<span class="hljs-string">&quot;color_tag like \&quot;brown_8\&quot;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;color_tag&quot;</span>]
)

results = []

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    result = iterator.<span class="hljs-built_in">next</span>()
    <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> result:
        iterator.close()
        <span class="hljs-keyword">break</span>
        
    results.extend(result)
    
<span class="hljs-comment"># 8. Check the search results</span>
<span class="hljs-built_in">print</span>(<span class="hljs-built_in">len</span>(results))

<span class="hljs-built_in">print</span>(results[:<span class="hljs-number">3</span>])

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;brown_8785&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 94</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;brown_8568&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 176</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;brown_8721&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 289</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">param</span>.<span class="hljs-property">dml</span>.<span class="hljs-property">QueryIteratorParam</span>;
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">orm</span>.<span class="hljs-property">iterator</span>.<span class="hljs-property">QueryIterator</span>;

<span class="hljs-comment">// 5. Query with iterators</span>

<span class="hljs-keyword">try</span> {
    <span class="hljs-title class_">Files</span>.<span class="hljs-title function_">write</span>(<span class="hljs-title class_">Path</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;results.json&quot;</span>), <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">toJSONString</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;()).<span class="hljs-title function_">getBytes</span>(), <span class="hljs-title class_">StandardOpenOption</span>.<span class="hljs-property">CREATE</span>, <span class="hljs-title class_">StandardOpenOption</span>.<span class="hljs-property">TRUNCATE_EXISTING</span>);
} <span class="hljs-keyword">catch</span> (<span class="hljs-title class_">Exception</span> e) {
    <span class="hljs-comment">// <span class="hljs-doctag">TODO:</span> handle exception</span>
    e.<span class="hljs-title function_">printStackTrace</span>();
}

<span class="hljs-title class_">QueryIteratorParam</span> queryIteratorParam = <span class="hljs-title class_">QueryIteratorParam</span>.<span class="hljs-title function_">newBuilder</span>()
    .<span class="hljs-title function_">withCollectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">withExpr</span>(<span class="hljs-string">&quot;color_tag like \&quot;brown_8%\&quot;&quot;</span>)
    .<span class="hljs-title function_">withBatchSize</span>(50L)
    .<span class="hljs-title function_">addOutField</span>(<span class="hljs-string">&quot;vector&quot;</span>)
    .<span class="hljs-title function_">addOutField</span>(<span class="hljs-string">&quot;color_tag&quot;</span>)
    .<span class="hljs-title function_">build</span>();

R&lt;<span class="hljs-title class_">QueryIterator</span>&gt; queryIteratRes = client.<span class="hljs-title function_">queryIterator</span>(queryIteratorParam);

<span class="hljs-keyword">if</span> (queryIteratRes.<span class="hljs-title function_">getStatus</span>() != R.<span class="hljs-property">Status</span>.<span class="hljs-property">Success</span>.<span class="hljs-title function_">getCode</span>()) {
    <span class="hljs-title class_">System</span>.<span class="hljs-property">err</span>.<span class="hljs-title function_">println</span>(queryIteratRes.<span class="hljs-title function_">getMessage</span>());
}

<span class="hljs-title class_">QueryIterator</span> queryIterator = queryIteratRes.<span class="hljs-title function_">getData</span>();

<span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
    <span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">QueryResultsWrapper</span>.<span class="hljs-property">RowRecord</span>&gt; batchResults = queryIterator.<span class="hljs-title function_">next</span>();
    <span class="hljs-keyword">if</span> (batchResults.<span class="hljs-title function_">isEmpty</span>()) {
        queryIterator.<span class="hljs-title function_">close</span>();
        <span class="hljs-keyword">break</span>;
    }

    <span class="hljs-title class_">String</span> jsonString = <span class="hljs-string">&quot;&quot;</span>;
    <span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>&gt; jsonObject = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
    <span class="hljs-keyword">try</span> {
        jsonString = <span class="hljs-title class_">Files</span>.<span class="hljs-title function_">readString</span>(<span class="hljs-title class_">Path</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;results.json&quot;</span>));
        jsonObject = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parseArray</span>(jsonString).<span class="hljs-title function_">toJavaList</span>(<span class="hljs-literal">null</span>);
    } <span class="hljs-keyword">catch</span> (<span class="hljs-title class_">IOException</span> e) {
        <span class="hljs-comment">// TODO Auto-generated catch block</span>
        e.<span class="hljs-title function_">printStackTrace</span>();
    }

    <span class="hljs-keyword">for</span> (<span class="hljs-title class_">QueryResultsWrapper</span>.<span class="hljs-property">RowRecord</span> queryResult : batchResults) {
        <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span> row = <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>();
        row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;id&quot;</span>, queryResult.<span class="hljs-title function_">get</span>(<span class="hljs-string">&quot;id&quot;</span>));
        row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;vector&quot;</span>, queryResult.<span class="hljs-title function_">get</span>(<span class="hljs-string">&quot;vector&quot;</span>));
        row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;color_tag&quot;</span>, queryResult.<span class="hljs-title function_">get</span>(<span class="hljs-string">&quot;color_tag&quot;</span>));
        jsonObject.<span class="hljs-title function_">add</span>(row);
    }

    <span class="hljs-keyword">try</span> {
        <span class="hljs-title class_">Files</span>.<span class="hljs-title function_">write</span>(<span class="hljs-title class_">Path</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;results.json&quot;</span>), <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">toJSONString</span>(jsonObject).<span class="hljs-title function_">getBytes</span>(), <span class="hljs-title class_">StandardOpenOption</span>.<span class="hljs-property">WRITE</span>);
    } <span class="hljs-keyword">catch</span> (<span class="hljs-title class_">IOException</span> e) {
        <span class="hljs-comment">// TODO Auto-generated catch block</span>
        e.<span class="hljs-title function_">printStackTrace</span>();
    }
}
<button class="copy-code-btn"></button></code></pre>
<table class="language-python">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>batch_size</code></td>
      <td>The number of entities to return each time you call <code>next()</code> on the current iterator.<br/>The value defaults to <strong>1000</strong>. Set it to a proper value to control the number of entities to return per iteration.</td>
    </tr>
    <tr>
      <td><code>expr</code></td>
      <td>A scalar filtering condition to filter matching entities.<br/>The value defaults to <strong>None</strong>, indicating that scalar filtering is ignored. To build a scalar filtering condition, refer to <a href="https://milvus.io/docs/boolean.md">Boolean Expression Rules</a>.</td>
    </tr>
    <tr>
      <td><code>output_fields</code></td>
      <td>A list of field names to include in each entity in return.<br/>The value defaults to <strong>None</strong>. If left unspecified, only the primary field is included.</td>
    </tr>
    <tr>
      <td><code>limit</code></td>
      <td>The total number of entities to return.<br/>The value defaults to <strong>-1</strong>, indicating all matching entities will be in return.</td>
    </tr>
  </tbody>
</table>
<table class="language-java">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>withCollectionName</code></td>
      <td>Set the collection name. Collection name cannot be empty or null.</td>
    </tr>
    <tr>
      <td><code>withExpr</code></td>
      <td>Set the expression to query entities. To build a scalar filtering condition, refer to <a href="https://milvus.io/docs/boolean.md">Boolean Expression Rules</a>.</td>
    </tr>
    <tr>
      <td><code>withBatchSize</code></td>
      <td>The number of entities to return each time you call <code>next()</code> on the current iterator.<br/>The value defaults to <strong>1000</strong>. Set it to a proper value to control the number of entities to return per iteration.</td>
    </tr>
    <tr>
      <td><code>addOutField</code></td>
      <td>Specifies an output scalar field (Optional).</td>
    </tr>
  </tbody>
</table>