'use client'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'
interface Company {
  id: string;
  name: string;
  address: string;
}
interface Factory {
  id: string;
  name: string;
  companyId: string;
  address: string;
}

export default function CreateInsuranceFormPage() {
  const { data: session } = useSession();

  // dynamic data
  const [companies, setCompanies] = useState<Company[]>([]);
  const [factories, setFactories] = useState<Factory[]>([]);

  // form state
  const [formData, setFormData] = useState<any>({
    company: "",
    factory: "",
    address: "",
    policyType: "จัดเก่าใหม่",
    insuredLocation: "",
    projectName: "",
    insuranceType: "",
    policyNumber: "",
    procurementPurpose: "",
    insuranceAmount: "",
    quantity: "",
    placeCount: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    totalDays: 0,
    coverageDetail: "",
    doc1: "",
    doc1Qty: "",
    doc1Pages: "",
    doc2: "",
    doc2Qty: "",
    doc2Pages: "",
    doc3: "",
    doc3Qty: "",
    doc3Pages: "",
    additionalInfo: "",
    taxCompany: "บริษัท มิตรผล จำกัด",
    taxAddress: "เลขที่ 123 ถนนสายสุข กรุงเทพฯ",
    taxId: "",
    costCenter: "",
    ioNumber: "",
    accountCode: "",
    accountName: "",
    requester: "",
    approver: "",
    inspector: ""
  });

  // load companies & factories
  // in CreateInsuranceFormPage.tsx
useEffect(() => {
  fetch('http://localhost:5000/api/companies')
    .then(r => r.json())
    .then(setCompanies)
    .catch(console.error);
}, []);

// 2. Whenever company selection changes: fetch factories
useEffect(() => {
  if (!formData.company) {
    setFactories([]);
    return;
  }
  fetch(`http://localhost:5000/api/factories?company=${formData.company}`)
    .then(r => {
      if (!r.ok) throw new Error(`Status ${r.status}`);
      return r.json();
    })
    .then(setFactories)
    .catch(console.error);
}, [formData.company]);



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => {
      let updated = { ...prev, [name]: value };
      // auto-fill address when company or factory changes
      if (name === "company") {
        const comp = companies.find((c) => c.id === value);
        updated.factory = "";
        updated.address = comp?.address || "";
      } else if (name === "factory") {
        const fac = factories.find((f) => f.id === value);
        updated.address = fac?.address || updated.address;
      }
      // calculate total days
      if (name === "startDate" || name === "endDate") {
        if (updated.startDate && updated.endDate) {
          const sd = new Date(updated.startDate);
          const ed = new Date(updated.endDate);
          const diffMs = ed.getTime() - sd.getTime();
          const diffDays = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
          updated.totalDays = diffDays;
        } else {
          updated.totalDays = 0;
        }
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) {
      alert("กรุณาเข้าสู่ระบบก่อนสร้างแบบฟอร์ม");
      return;
    }
    const payload = { ...formData, creatorId: session.user.id, status: "DRAFT" };
    try {
      const res = await fetch("/api/insuranceForms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      alert("สร้างแบบฟอร์มเรียบร้อย: " + data.formId);
    } catch {
      alert("เกิดข้อผิดพลาดในการสร้างแบบฟอร์ม");
    }
  };

  const availableFactories = factories.filter((f) => f.companyId === formData.company);

  return (
    <div className="container mx-auto p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Insurance Requisition Form</h1>
        <div>คุณลงชื่อเข้าใช้เป็น: {session?.user?.name || "Guest"}</div>
      </header>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Policy Type */}
        <div>
          <label className="block mb-1">ชนิดของกรมธรรม์</label>
          <input
            name="policyType"
            value={formData.policyType}
            readOnly
            className="w-full bg-gray-200 rounded p-2"
          />
        </div>

        {/* Company & Factory */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">บริษัท</label>
            <select
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="">-- เลือกบริษัท --</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">โรงงาน</label>
            <select
              name="factory"
              value={formData.factory}
              onChange={handleChange}
              disabled={!formData.company}
              className="w-full border rounded p-2"
            >
              <option value="">-- เลือกโรงงาน --</option>
              {availableFactories.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block mb-1">ที่อยู่</label>
          <input
            name="address"
            value={formData.address}
            readOnly
            className="w-full bg-gray-200 rounded p-2"
          />
        </div>

        {/* Location & Project */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">ที่ตั้งสถานที่เอาประกันภัย</label>
            <input
              name="insuredLocation"
              value={formData.insuredLocation}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-1">ชื่อโครงการ (ถ้ามี)</label>
            <input
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        </div>

        {/* Insurance Type & Number */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">ประเภทกรมธรรม์</label>
            <input
              name="insuranceType"
              value={formData.insuranceType}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-1">เลขที่กรมธรรม์</label>
            <input
              name="policyNumber"
              value={formData.policyNumber}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        </div>

        {/* Purpose */}
        <div>
          <label className="block mb-1">วัตถุประสงค์การแจ้งจัดหา</label>
          <input
            name="procurementPurpose"
            value={formData.procurementPurpose}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Amount, Quantity, Place Count */}
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block mb-1">ทุนประกัน (บาท)</label>
            <input
              name="insuranceAmount"
              value={formData.insuranceAmount}
              onChange={handleChange}
              type="number"
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-1">จำนวน (คืน)</label>
            <input
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              type="number"
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-1">จำนวนสถานที่</label>
            <input
              name="placeCount"
              value={formData.placeCount}
              onChange={handleChange}
              type="number"
              className="w-full border rounded p-2"
            />
          </div>
        </div>

        {/* Coverage Period & Days */}
        <div>
          <label className="block mb-1">ระยะเวลาความคุ้มครอง</label>
          <div className="grid grid-cols-7 gap-2 items-end">
            <span>เริ่มต้น</span>
            <input
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              className="border rounded p-2"
            />
            <span>เวลา</span>
            <input
              name="startTime"
              type="time"
              value={formData.startTime}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>
          <div className="grid grid-cols-7 gap-2 items-end mt-2">
            <span>สิ้นสุด</span>
            <input
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              className="border rounded p-2"
            />
            <span>เวลา</span>
            <input
              name="endTime"
              type="time"
              value={formData.endTime}
              onChange={handleChange}
              className="border rounded p-2"
            />
            <span>จำนวนวัน</span>
            <input
              name="totalDays"
              value={formData.totalDays}
              readOnly
              className="border rounded p-2 w-16 bg-gray-200"
            />
          </div>
        </div>

        {/* Coverage Detail */}
        <div>
          <label className="block mb-1">รายละเอียดเพิ่มเติมสำหรับความคุ้มครองที่ต้องการ</label>
          <textarea
            name="coverageDetail"
            value={formData.coverageDetail}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Attached Documents */}
        <div>
          <label className="block mb-1">เอกสารแนบ</label>
          {[1, 2, 3].map((i) => (
            <div key={i} className="grid grid-cols-12 gap-2 items-center mb-2">
              <span className="col-span-1">{i}</span>
              <input
                name={`doc${i}`}
                value={formData[`doc${i}`]}
                onChange={handleChange}
                placeholder="ชื่อเอกสาร"
                className="col-span-7 border rounded p-2"
              />
              <input
                name={`doc${i}Qty`}
                value={formData[`doc${i}Qty`]}
                onChange={handleChange}
                placeholder="จำนวน"
                type="number"
                className="col-span-2 border rounded p-2"
              />
              <input
                name={`doc${i}Pages`}
                value={formData[`doc${i}Pages`]}
                onChange={handleChange}
                placeholder="หน้า"
                type="number"
                className="col-span-2 border rounded p-2"
              />
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div>
          <label className="block mb-1">โปรดระบุลำดับที่ของรายการและแนบข้อมูล</label>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            rows={2}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Tax Invoice Info */}
        <div>
          <label className="block mb-1">ออกใบกำกับภาษีในนามบริษัท</label>
          <input
            readOnly
            className="w-full bg-gray-200 rounded p-2"
            value={formData.taxCompany}
          />
        </div>
        <div>
          <label className="block mb-1">ที่อยู่</label>
          <input
            readOnly
            className="w-full bg-gray-200 rounded p-2"
            value={formData.taxAddress}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <input
            name="taxId"
            placeholder="เลขผู้เสียภาษี"
            value={formData.taxId}
            onChange={handleChange}
            className="bg-gray-200 rounded p-2"
          />
          <input
            name="costCenter"
            value={formData.costCenter}
            onChange={handleChange}
            placeholder="Cost Center"
            className="border rounded p-2"
          />
          <input
            name="ioNumber"
            value={formData.ioNumber}
            onChange={handleChange}
            placeholder="I/O No."
            className="border rounded p-2"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            name="accountCode"
            value={formData.accountCode}
            onChange={handleChange}
            placeholder="รหัสบัญชี"
            className="border rounded p-2"
          />
          <input
            name="accountName"
            value={formData.accountName}
            onChange={handleChange}
            placeholder="ชื่อบัญชี"
            className="border rounded p-2"
          />
        </div>

        {/* Approvals */}
        <div>
          <label className="block mb-1">ผู้แจ้งจัดหา (หน่วยงานต้นสังกัด)</label>
          <input
            readOnly
            name="requester"
            value={formData.requester}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="-- เลือกผู้แจ้งจัดหา --"
          />
        </div>
        <div>
          <label className="block mb-1">ผู้อนุมัติของหน่วยงานต้นสังกัด</label>
          <input
            readOnly
            name="approver"
            value={formData.approver}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="-- เลือกผู้อนุมัติ --"
          />
        </div>
        <div>
          <label className="block mb-1">
            ผู้รับอนุญาตด้านการเบิกกลุ่มงานย่อย (รับทราบและตรวจสอบ)
          </label>
          <input
            readOnly
            name="inspector"
            value={formData.inspector}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="-- เลือกผู้รับอนุญาต --"
          />
        </div>

        <button
          type="submit"
          className="block mx-auto bg-blue-600 text-white py-2 px-8 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}