export default function OwnersCut() {
  return (
    <fieldset className="mt-6 mb-6">
      <label
        htmlFor="ownersCut"
        className="mb-2 font-semibold block">oracle's cut</label>
      <input
        type="number"
        id="ownersCut"
        name="ownersCut"
        className="p-3 outline outline-1 outline-gray-200 hover:outline-gray-300 rounded-lg text-center mr-3 focus:outline-2 focus:outline-indigo-800"
        defaultValue={0.01}
        min={0}
        max={5}
        style={{ width: '100px' }}
      />
      %
    </fieldset>
  )
}