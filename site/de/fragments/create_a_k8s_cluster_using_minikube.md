---

---

<h3 id="Create-a-K8s-cluster-using-minikube" class="common-anchor-header">Create a K8s cluster using minikube</h3><p>We recommend installing Milvus on K8s with <a href="https://minikube.sigs.k8s.io/docs/">minikube</a>, a tool that allows you to run K8s locally.</p>
<div class="alert note">
minikube can only be used in test environments. It is not recommended that you deploy Milvus distributed clusters in this way in production environments.
</div>
<h4 id="1-Install-minikube" class="common-anchor-header">1. Install minikube</h4><p>See <a href="https://minikube.sigs.k8s.io/docs/start/">install minikube</a> for more information.</p>
<h4 id="2-Start-a-K8s-cluster-using-minikube" class="common-anchor-header">2. Start a K8s cluster using minikube</h4><p>After installing minikube, run the following command to start a K8s cluster.</p>
<pre><code>$ minikube start
<button class="copy-code-btn"></button></code></pre>
<h4 id="3-Check-the-K8s-cluster-status" class="common-anchor-header">3. Check the K8s cluster status</h4><p>Run <code>$ kubectl cluster-info</code> to check the status of the K8s cluster you just created. Ensure that you can access the K8s cluster via <code>kubectl</code>. If you have not installed <code>kubectl</code> locally, see <a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">Use kubectl inside minikube</a>.</p>
