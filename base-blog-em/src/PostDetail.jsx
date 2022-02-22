import { useMutation, useQuery } from 'react-query'

async function fetchComments(postId) {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/comments?postId=${postId}`
	)
	return response.json()
}

async function deletePost(postId) {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/postId/${postId}`,
		{ method: 'DELETE' }
	)
	return response.json()
}

async function updatePost(postId) {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/postId/${postId}`,
		{ method: 'PATCH', data: { title: 'REACT QUERY FOREVER!!!!' } }
	)
	return response.json()
}

export function PostDetail({ post }) {
	const { data, isLoading, isError, error } = useQuery(
		['comments', post.id],
		() => fetchComments(post.id)
	)

	const deleteMutation = useMutation((postId) => deletePost(postId))
	const updateMutation = useMutation((postId) => updatePost(postId))

	if (isLoading) return <h3>Loading...</h3>
	if (isError)
		return (
			<>
				<h3>Oops, something went wrong</h3>
				<p>{error.toString()}</p>
			</>
		)

	return (
		<>
			<h3 className='post-title'>{post.title}</h3>
			<button onClick={() => deleteMutation.mutate(post.id)}>
				Delete
			</button>
			<button onClick={() => updateMutation.mutate(post.id)}>
				Update title
			</button>
			{deleteMutation.isError && (
				<p className='error'>Error deleting the post</p>
			)}
			{deleteMutation.isLoading && (
				<p className='loading'>Deleting the post</p>
			)}
			{deleteMutation.isSuccess && (
				<p className='success'>Post has (not) been deleted</p>
			)}
			{updateMutation.isError && (
				<p className='error'>Error updating the post</p>
			)}
			{updateMutation.isLoading && (
				<p className='loading'>Updating the post</p>
			)}
			{updateMutation.isSuccess && (
				<p className='success'>Post has (not) been updated</p>
			)}
			<p>{post.body}</p>
			<h4>Comments</h4>
			{data.map((comment) => (
				<li key={comment.id}>
					{comment.email}: {comment.body}
				</li>
			))}
		</>
	)
}
